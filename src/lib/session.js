export const SURVEY_SESSION_ID_KEY = "apt_survey_session_id";

const getCrypto = () => {
  if (typeof globalThis === "undefined") return null;
  return globalThis.crypto || null;
};

const getStorage = () => {
  if (typeof globalThis === "undefined") return null;
  return globalThis.localStorage || null;
};

export function createSessionId() {
  const cryptoObj = getCrypto();
  if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();

  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  }

  return Math.random()
    .toString(36)
    .slice(2) +
    Math.random().toString(36).slice(2);
}

export function getSurveySessionId() {
  const storage = getStorage();
  if (!storage) return null;
  try {
    return storage.getItem(SURVEY_SESSION_ID_KEY);
  } catch {
    return null;
  }
}

export function getOrCreateSurveySessionId() {
  const storage = getStorage();
  if (!storage) return createSessionId();
  try {
    const existing = storage.getItem(SURVEY_SESSION_ID_KEY);
    if (existing) return existing;
    const created = createSessionId();
    storage.setItem(SURVEY_SESSION_ID_KEY, created);
    return created;
  } catch {
    return null;
  }
}
