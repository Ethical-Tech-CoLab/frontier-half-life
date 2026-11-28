// Phase 1 fetcher: SWE-bench Verified "Bash Only" submissions (mini-SWE-agent) from the
// public SWE-bench/experiments repository, pinned to one commit, with SHA-256 checksums.
// Network is needed only here; analysis and tests read the committed copies.
// Run: node tools/fetch-swebench-bash-only.mjs   (set GITHUB_TOKEN to raise API limits)
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

const REPO = 'SWE-bench/experiments';
const OUT = new URL('../data/raw/swebench-verified-bash-only/', import.meta.url);
const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};

async function json(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}
async function text(url, { optional = false } = {}) {
  const response = await fetch(url);
  if (optional && response.status === 404) return null;
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

const commit = (await json(`https://api.github.com/repos/${REPO}/commits/main`)).sha;
const listing = await json(`https://api.github.com/repos/${REPO}/contents/evaluation/verified?ref=${commit}`);
const candidates = listing.map((entry) => entry.name).filter((name) => /_mini-v\d/.test(name)).sort();
const manifest = [];
const submissions = [];
for (const name of candidates) {
  const base = `https://raw.githubusercontent.com/${REPO}/${commit}/evaluation/verified/${name}/`;
  const metadata = await text(`${base}metadata.yaml`);
  if (!/^\s*agent:\s*mini-SWE-agent\s*$/m.test(metadata)) continue;
  submissions.push(name);
  // Older submissions publish only an aggregate score; they are kept and compared unpaired.
  const details = await text(`${base}per_instance_details.json`, { optional: true });
  await mkdir(new URL(`${name}/`, OUT), { recursive: true });
  for (const [file, body] of [['metadata.yaml', metadata], ['per_instance_details.json', details]].filter(([, body]) => body !== null)) {
    await writeFile(new URL(`${name}/${file}`, OUT), body);
    manifest.push({ submission: name, file, sha256: createHash('sha256').update(body).digest('hex'), bytes: Buffer.byteLength(body), source_url: `${base}${file}` });
  }
}
const header = 'submission,file,sha256,bytes,source_url';
await writeFile(new URL('MANIFEST.csv', OUT), `${header}\n${manifest.map((row) => [row.submission, row.file, row.sha256, row.bytes, row.source_url].join(',')).join('\n')}\n`);
await writeFile(new URL('SOURCE.md', OUT), `# SWE-bench Verified "Bash Only" submissions — pinned copy

- **Source:** https://github.com/${REPO} at commit \`${commit}\`, directory \`evaluation/verified/\`.
- **Retrieved:** ${new Date().toISOString().slice(0, 10)} by \`tools/fetch-swebench-bash-only.mjs\`.
- **Selection:** submissions named \`*_mini-v*\` whose \`metadata.yaml\` lists \`agent: mini-SWE-agent\` (${submissions.length} submissions; ${manifest.filter((row) => row.file === 'per_instance_details.json').length} with per-instance results).
- **Licence:** the SWE-bench repository states MIT. Files are copied unchanged; see \`MANIFEST.csv\` for SHA-256 checksums and source URLs.
- **Use:** contamination-flagged coding history under rubric 0.4.0 (T12). Never the sole basis for dating a catch-up.
`);
console.log(`Pinned ${submissions.length} mini-SWE-agent submissions at ${commit}.`);
