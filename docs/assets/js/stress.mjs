// Illustrative FR-14 compute-pressure boundary: expense strictly above the
// threshold share of revenue for `run` consecutive comparable quarters.
// Pure functions shared by the generator, the page and the tests.
export const DEFAULT_THRESHOLD = 60;
export const REQUIRED_RUN = 4;
export const THRESHOLD_LIMITS = Object.freeze({ min: 1, max: 300 });

export function parseThreshold(raw) {
  const value = Number(String(raw).trim());
  if (String(raw).trim() === '' || !Number.isFinite(value)) return { error: 'Enter a number.' };
  if (value < THRESHOLD_LIMITS.min || value > THRESHOLD_LIMITS.max) {
    return { error: `Enter a value from ${THRESHOLD_LIMITS.min} to ${THRESHOLD_LIMITS.max}.` };
  }
  return { value };
}

// quarters: [{ period, ratio }] in chronological order; null ratio interrupts continuity.
export function evaluatePressure(quarters, threshold = DEFAULT_THRESHOLD, required = REQUIRED_RUN) {
  let run = 0;
  let longest = 0;
  const rows = quarters.map(({ period, ratio }) => {
    const known = typeof ratio === 'number' && Number.isFinite(ratio);
    const above = known && ratio > threshold;
    run = above ? run + 1 : 0;
    longest = Math.max(longest, run);
    return { period, ratio: known ? ratio : null, above, run, met: run >= required };
  });
  const first = rows.find((row) => row.met);
  return { rows, longest, met: Boolean(first), firstMet: first ? first.period : null, threshold, required };
}

export function summary(result) {
  return result.met
    ? `Boundary met: above ${result.threshold}% for ${result.required} consecutive quarters by ${result.firstMet} (longest run ${result.longest}). Illustrative trigger, not a viability verdict.`
    : `Not met in the reported quarters: longest run above ${result.threshold}% is ${result.longest} of ${result.required}. “None found within searched domain” is not “safe”.`;
}

export function initializeStress({ document }) {
  const form = document.querySelector('#pressure-form');
  if (!form) return null;
  const rows = [...document.querySelectorAll('[data-ratio]')];
  const quarters = rows.map((row) => ({ period: row.dataset.period, ratio: Number(row.dataset.ratio) }));
  const input = form.elements.threshold;
  const error = document.querySelector('#threshold-error');
  const status = document.querySelector('#pressure-status');
  const marker = document.querySelector('#threshold-marker');
  const scaleMax = Number(marker?.dataset.scaleMax || 260);

  function apply() {
    const parsed = parseThreshold(input.value);
    if (parsed.error) {
      error.textContent = parsed.error;
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      status.textContent = `Result withheld until the threshold is valid; the table still shows the last valid evaluation (stale).`;
      for (const row of rows) row.dataset.stale = 'true';
      return null;
    }
    error.hidden = true;
    input.removeAttribute('aria-invalid');
    const result = evaluatePressure(quarters, parsed.value);
    result.rows.forEach((evaluated, index) => {
      const row = rows[index];
      delete row.dataset.stale;
      row.querySelector('[data-cell="above"]').textContent = evaluated.above ? 'Above' : 'Not above';
      row.querySelector('[data-cell="run"]').textContent = String(evaluated.run);
      row.querySelector('[data-cell="met"]').textContent = evaluated.met ? 'Met' : '—';
    });
    if (marker) marker.style.left = `${Math.min(100, (parsed.value / scaleMax) * 100)}%`;
    document.querySelector('#threshold-label').textContent = `${parsed.value}%`;
    status.textContent = summary(result);
    return result;
  }

  form.hidden = false;
  form.addEventListener('submit', (event) => { event.preventDefault(); apply(); });
  input.addEventListener('input', apply);
  form.addEventListener('reset', () => setTimeout(apply, 0));
  return { apply };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') initializeStress({ document });
