#!/usr/bin/env node
/**
 * create-digest.mjs
 * Reads the blog RSS feed, collects posts from the last 7 days,
 * and creates a draft email campaign in Brevo (formerly Sendinblue).
 *
 * Run manually:   node scripts/create-digest.mjs
 * Run via GitHub Actions: every Sunday at 9am (see .github/workflows/weekly-digest.yml)
 *
 * Required env vars:
 *   BREVO_API_KEY       — Brevo → Account → SMTP & API → API Keys
 *   BREVO_LIST_ID       — Brevo → Contacts → Lists → your list ID (number)
 *   BREVO_SENDER_NAME   — e.g. "Christian Beltrami"
 *   BREVO_SENDER_EMAIL  — e.g. "humancontact@human-ai-human.org"
 *   SITE_URL            — https://www.human-ai-human.org (optional, has default)
 */

const SITE_URL          = process.env.SITE_URL ?? 'https://www.human-ai-human.org';
const RSS_URL           = `${SITE_URL}/rss.xml`;
const BREVO_API_KEY     = process.env.BREVO_API_KEY;
const BREVO_LIST_ID     = Number(process.env.BREVO_LIST_ID ?? 0);
const BREVO_SENDER_NAME  = process.env.BREVO_SENDER_NAME  ?? 'human-ai-human';
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL ?? 'humancontact@human-ai-human.org';

if (!BREVO_API_KEY) {
  console.error('❌  BREVO_API_KEY is not set.');
  process.exit(1);
}
if (!BREVO_LIST_ID) {
  console.error('❌  BREVO_LIST_ID is not set.');
  process.exit(1);
}

// ── 1. Fetch & parse RSS ──────────────────────────────────

async function fetchRSS() {
  const res = await fetch(RSS_URL);
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
  return res.text();
}

function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title   = (/<title><!\[CDATA\[(.*?)\]\]><\/title>/.exec(block) ??
                     /<title>(.*?)<\/title>/.exec(block))?.[1]?.trim() ?? '';
    const link    = /<link>(.*?)<\/link>/.exec(block)?.[1]?.trim() ?? '';
    const pubDate = /<pubDate>(.*?)<\/pubDate>/.exec(block)?.[1]?.trim() ?? '';
    const desc    = (/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/.exec(block) ??
                     /<description>([\s\S]*?)<\/description>/.exec(block))?.[1]?.trim() ?? '';

    if (title && link) {
      items.push({ title, link, pubDate, description: desc });
    }
  }

  return items;
}

function postsFromLastDays(items, days = 7) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return items.filter(item => {
    if (!item.pubDate) return false;
    const d = new Date(item.pubDate).getTime();
    return !isNaN(d) && d >= cutoff;
  });
}

// ── 2. Format email HTML ──────────────────────────────────

function formatDigestHTML(posts) {
  const today = new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date());

  const postBlocks = posts.map(post => `
    <tr>
      <td style="padding: 24px 0; border-bottom: 1px solid #D9D4C8;">
        <h2 style="margin: 0 0 8px 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #141414;">
          <a href="${post.link}" style="color: #C73019; text-decoration: underline;">${post.title}</a>
        </h2>
        ${post.description
          ? `<p style="margin: 0 0 10px 0; font-family: Georgia, serif; font-size: 15px; color: #5A5A5A; line-height: 1.6;">${post.description}</p>`
          : ''}
        <a href="${post.link}" style="font-family: Georgia, serif; font-size: 14px; color: #C73019; text-decoration: none;">Lire l'article →</a>
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0; padding:0; background:#F4F3EE;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F3EE; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#FEFEF3; border: 1px solid #D9D4C8;">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px; border-bottom: 1px solid #D9D4C8; text-align: center;">
              <p style="margin:0; font-family: Georgia, serif; font-size: 22px; color: #141414;">
                human &nbsp;<span style="color:#F93C20;">——▶</span>&nbsp;
                <strong style="color:#F93C20;">AI</strong>&nbsp;
                <span style="color:#F93C20;">——▶</span>&nbsp; human
              </p>
              <p style="margin: 8px 0 0; font-family: Georgia, serif; font-size: 13px; color: #5A5A5A;">
                Digest hebdomadaire · ${today}
              </p>
            </td>
          </tr>

          <!-- Posts -->
          <tr>
            <td style="padding: 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${postBlocks}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 32px; border-top: 1px solid #D9D4C8; text-align: center;">
              <p style="margin:0; font-family: Georgia, serif; font-size: 13px; color: #5A5A5A;">
                <a href="${SITE_URL}" style="color:#C73019;">${SITE_URL.replace('https://www.','')}</a>
                &nbsp;·&nbsp;
                <a href="{{ unsubscribe }}" style="color: #5A5A5A;">Se désabonner</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ── 3. Create Brevo draft campaign ────────────────────────

async function createBrevoDraft(subject, html) {
  const res = await fetch('https://api.brevo.com/v3/emailCampaigns', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `Digest ${new Date().toISOString().slice(0, 10)}`,
      subject,
      sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
      type: 'classic',
      htmlContent: html,
      recipients: { listIds: [BREVO_LIST_ID] },
      // status 'draft' = not scheduled, Christian reviews before sending
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo API error ${res.status}: ${err}`);
  }

  return res.json();
}

// ── Main ──────────────────────────────────────────────────

(async () => {
  console.log(`📡  Fetching RSS from ${RSS_URL}...`);
  const xml = await fetchRSS();
  const allPosts = parseRSS(xml);
  const recentPosts = postsFromLastDays(allPosts, 7);

  console.log(`📝  Found ${allPosts.length} total posts, ${recentPosts.length} from the last 7 days.`);

  if (recentPosts.length === 0) {
    console.log('ℹ️   No new posts this week — no draft created.');
    process.exit(0);
  }

  const today = new Date().toLocaleDateString('fr-CA');
  const subject = recentPosts.length === 1
    ? `${recentPosts[0].title} — human-ai-human`
    : `Digest ${today} — ${recentPosts.length} nouveaux articles`;

  const html = formatDigestHTML(recentPosts);

  console.log(`✉️   Creating Brevo draft: "${subject}"...`);
  const campaign = await createBrevoDraft(subject, html);

  console.log(`✅  Draft campaign created!`);
  console.log(`    ID: ${campaign.id}`);
  console.log(`    Review & send: https://app.brevo.com/campaign/email/${campaign.id}/edit`);
})();
