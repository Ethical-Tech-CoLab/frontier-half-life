// Minimal RFC 4180-style CSV parser shared by the renderer, extractor tests and validation.
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { cell += '"'; index += 1; } else if (character === '"') quoted = false; else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') { row.push(cell); cell = ''; } else if (character === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; } else if (character !== '\r') cell += character;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [header = [], ...body] = rows;
  return {
    header,
    rows: body.map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] ?? '']))),
    widths: body.map((values) => values.length),
  };
}
