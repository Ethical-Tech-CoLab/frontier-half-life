// Small, safe Markdown subset for the manuscript: headings, paragraphs, emphasis,
// inline code, links, pipe tables and fenced blocks. All source text is escaped;
// raw HTML is never passed through except the explicit `<a id="..."></a>` anchors,
// which are consumed as section boundaries by the caller.
export const escape = (value) => String(value).replace(/[&<>"']/g, (character) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

const emphasis = (html) => html
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');

// options.link(href) -> { href, attrs } | null ; options.decorate(html) adds claim links to plain text.
export function inline(text, options = {}) {
  const { link = (href) => ({ href }), decorate = (html) => html } = options;
  let out = '';
  const pattern = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    out += decorate(emphasis(escape(text.slice(last, match.index))));
    if (match[1] !== undefined) {
      out += `<code>${escape(match[1])}</code>`;
    } else {
      const target = link(match[3]);
      const label = emphasis(escape(match[2]));
      out += target
        ? `<a href="${escape(target.href)}"${target.attrs ? ` ${target.attrs}` : ''}>${label}</a>`
        : label;
    }
    last = match.index + match[0].length;
  }
  out += decorate(emphasis(escape(text.slice(last))));
  return out;
}

function table(lines, options) {
  const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
  const [head, separator, ...body] = lines;
  const align = cells(separator).map((spec) => (/^-+:$/.test(spec) ? ' class="num"' : ''));
  const caption = options.caption ? `<caption>${escape(options.caption)}</caption>` : '';
  return `<div class="table-wrap" role="region" tabindex="0" aria-label="${escape(options.caption || 'Data table')}"><table>${caption}
<thead><tr>${cells(head).map((cell, index) => `<th scope="col"${align[index] || ''}>${inline(cell, options)}</th>`).join('')}</tr></thead>
<tbody>${body.map((line) => `<tr>${cells(line).map((cell, index) => `<td${align[index] || ''}>${inline(cell, options)}</td>`).join('')}</tr>`).join('\n')}</tbody></table></div>`;
}

// Returns an array of { type, html, text } blocks so callers can wrap special paragraphs.
export function blocks(markdown, options = {}) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim() || /^<a id="[\w-]+"><\/a>$/.test(line.trim())) { index += 1; continue; }
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const body = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) body.push(lines[index++]);
      index += 1;
      out.push({ type: 'code', html: `<pre><code>${escape(body.join('\n'))}</code></pre>`, text: body.join('\n') });
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      out.push({ type: `h${heading[1].length}`, level: heading[1].length, text: heading[2], html: inline(heading[2], options) });
      index += 1;
      continue;
    }
    if (/^\|/.test(line) && /^\|?\s*:?-{3,}/.test(lines[index + 1] || '')) {
      const rows = [];
      while (index < lines.length && /^\|/.test(lines[index])) rows.push(lines[index++]);
      out.push({ type: 'table', html: table(rows, options), text: rows.join('\n') });
      continue;
    }
    const paragraph = [];
    while (index < lines.length && lines[index].trim() && !/^(#{1,6}\s|```|\||<a id=)/.test(lines[index])) paragraph.push(lines[index++].trim());
    const text = paragraph.join(' ');
    out.push({ type: 'p', text, html: inline(text, options) });
  }
  return out;
}
