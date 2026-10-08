import fs from 'fs';

const html = fs.readFileSync('public/shasi_live_scrape.html', 'utf8');

// remove style and script tags
const clean = html.replace(/<style[\s\S]*?<\/style>/gi, '')
                  .replace(/<script[\s\S]*?<\/script>/gi, '');

// extract all text content
const matches = clean.match(/<[^>]+>|[^<]+/g) || [];
let out = [];
for (let m of matches) {
  if (!m.startsWith('<')) {
    let t = m.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
    if (t.length > 2) out.push(t);
  }
}

fs.writeFileSync('public/live_content_extracted.txt', out.join('\n'));
console.log('Extracted lines:', out.length);
