import marathon_default from './marathon_default.json';
const defaultRaces = [
        "Boston - April 20 2026",
        "Cornwall - April 25 2026",
        "Ottawa - May 24 2026",
];

// Attempt to fetch editable races list from public/races.json at runtime.
// Falls back to bundled `defaultRaces` if fetch fails.
async function loadRaces() {
    try {
        const res = await fetch('/races.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        if (Array.isArray(data)) return data;
    } catch (e) {
        // ignore and fallback
    }
    return defaultRaces;
}

export { defaultRaces, loadRaces , marathon_default};
