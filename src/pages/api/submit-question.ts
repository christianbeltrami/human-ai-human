import type { APIRoute } from 'astro';

export const prerender = false;

// ── Types ─────────────────────────────────────────────────

interface QuestionBody {
  name?: string;
  email?: string;
  question: string;
}

interface AiFilterResult {
  valid: boolean;
  reason: string;
}

// ── AI Filter ─────────────────────────────────────────────

async function filterQuestion(question: string): Promise<AiFilterResult> {
  const apiKey = import.meta.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('[submit-question] No OPENAI_API_KEY — passing question through');
    return { valid: true, reason: 'No filter configured' };
  }

  const systemPrompt = `Tu es un filtre pour un blog sur l'IA créative tenu par un réalisateur et chercheur.
Détermine si le message est une vraie question ou un retour constructif (même critique, même difficile, même en désaccord), par opposition à du contenu agressif, harcelant, trollant ou spam.
Une critique sérieuse est toujours valide. Un désaccord poli est valide. Un message irrespectueux ou hors-sujet délibéré est invalide.
Réponds UNIQUEMENT en JSON strict : {"valid": true|false, "reason": "courte explication"}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question.slice(0, 2000) }, // safety cap
        ],
        max_tokens: 120,
        temperature: 0,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      console.error('[submit-question] OpenAI error:', res.status);
      return { valid: true, reason: 'Filter error — passing through' };
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(content) as Partial<AiFilterResult>;
    return {
      valid: parsed.valid ?? true,
      reason: parsed.reason ?? '',
    };
  } catch (err) {
    console.error('[submit-question] Filter exception:', err);
    return { valid: true, reason: 'Filter exception — passing through' };
  }
}

// ── Airtable ──────────────────────────────────────────────

async function logToAirtable(payload: {
  name: string;
  email: string;
  question: string;
  valid: boolean;
  reason: string;
}) {
  const token = import.meta.env.AIRTABLE_TOKEN;
  const baseId = import.meta.env.AIRTABLE_BASE_ID;
  const tableId = import.meta.env.AIRTABLE_TABLE_ID ?? 'Questions';

  if (!token || !baseId) return;

  try {
    await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Name: payload.name || '(anonymous)',
          Email: payload.email || '',
          Question: payload.question,
          Valid: payload.valid,
          FilterReason: payload.reason,
          Status: payload.valid ? 'new' : 'filtered',
          Date: new Date().toISOString(),
        },
      }),
    });
  } catch (err) {
    console.error('[submit-question] Airtable error:', err);
  }
}

// ── Email via Resend ──────────────────────────────────────

async function sendEmail(name: string, email: string, question: string) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_EMAIL ?? 'humancontact@human-ai-human.org';

  if (!apiKey) return;

  const from = 'noreply@human-ai-human.org';
  const replyTo = email || from;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [toEmail],
      reply_to: replyTo,
      subject: `[human-ai-human] New question from ${name || 'anonymous'}`,
      text: `Name: ${name || '(anonymous)'}\nEmail: ${email || '(none)'}\n\n${question}`,
      html: `<p><strong>Name:</strong> ${name || '(anonymous)'}<br/>
             <strong>Email:</strong> ${email || '(none)'}</p>
             <hr/>
             <p>${question.replace(/\n/g, '<br/>')}</p>`,
    }),
  });
}

// ── Handler ───────────────────────────────────────────────

export const POST: APIRoute = async ({ request }) => {
  let body: QuestionBody;

  try {
    body = await request.json() as QuestionBody;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const question = body.question?.trim() ?? '';
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';

  if (!question || question.length < 5) {
    return new Response(
      JSON.stringify({ error: 'Question is too short.' }),
      { status: 422, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (question.length > 3000) {
    return new Response(
      JSON.stringify({ error: 'Question is too long (max 3000 chars).' }),
      { status: 422, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 1. AI filter
  const { valid, reason } = await filterQuestion(question);

  // 2. Log to Airtable (always)
  await logToAirtable({ name, email, question, valid, reason });

  // 3. Send email only if valid
  if (valid) {
    await sendEmail(name, email, question);
    return new Response(
      JSON.stringify({ message: 'Thank you, your question has been received.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Neutral response for filtered messages (no info leakage)
  return new Response(
    JSON.stringify({ message: 'Thank you for your message.' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
