const hasStorage = () => typeof window !== "undefined" && window.localStorage;

export function readJson(key, fallback) {
  if (!hasStorage()) return fallback;

  try {
    const value = window.localStorage.getItem(key);
    if (value === null) return fallback;
    const parsed = JSON.parse(value);
    const fallbackIsArray = Array.isArray(fallback);
    const parsedIsArray = Array.isArray(parsed);
    if (fallbackIsArray !== parsedIsArray) return fallback;
    if (!fallbackIsArray && fallback !== null && typeof fallback === "object" && (parsed === null || typeof parsed !== "object")) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function readString(key, fallback) {
  if (!hasStorage()) return fallback;

  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function readNumber(key, fallback) {
  const value = Number(readString(key, ''));
  return Number.isFinite(value) ? value : fallback;
}

export function writeStorage(key, value) {
  if (!hasStorage()) return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable or full; the in-memory state still works.
  }
}

export function writeJson(key, value) {
  writeStorage(key, JSON.stringify(value));
}
