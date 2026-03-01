import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: { email?: string };

  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const email = body.email?.trim().toLowerCase() ?? '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email address.' }),
      { status: 422, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const apiKey = import.meta.env.BREVO_API_KEY;
  const listId = Number(import.meta.env.BREVO_LIST_ID ?? 3);

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Newsletter not configured.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  // 204 = already exists and updated, 201 = created
  if (res.status === 201 || res.status === 204) {
    return new Response(
      JSON.stringify({ message: 'Thank you — you are now subscribed.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Duplicate contact (already subscribed)
  if (res.status === 400) {
    const data = await res.json();
    if (data?.code === 'duplicate_parameter') {
      return new Response(
        JSON.stringify({ message: 'You are already subscribed.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return new Response(
    JSON.stringify({ error: 'Subscription failed. Please try again.' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
};
