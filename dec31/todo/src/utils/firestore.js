const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

export function requireProjectId() {
  if (!PROJECT_ID) throw new Error("Missing VITE_FIREBASE_PROJECT_ID in .env");
  return PROJECT_ID;
}

export function docPath(collection, docId) {
  const pid = requireProjectId();
  return `projects/${pid}/databases/(default)/documents/${collection}/${docId}`;
}

export function collectionUrl(collection) {
  const pid = requireProjectId();
  return `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/${collection}`;
}

export function docUrl(collection, docId) {
  const pid = requireProjectId();
  return `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/${collection}/${docId}`;
}

// Firestore REST "fields" mapping
export function toFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string") fields[k] = { stringValue: v };
    else if (typeof v === "boolean") fields[k] = { booleanValue: v };
    else if (typeof v === "number") fields[k] = { integerValue: v };
    else if (v instanceof Date) fields[k] = { timestampValue: v.toISOString() };
    else if (v === null || v === undefined) continue;
    else fields[k] = { stringValue: String(v) };
  }
  return { fields };
}

export function fromFirestoreDoc(doc) {
  const name = doc.name || "";
  const id = name.split("/").pop();

  const f = doc.fields || {};
  const get = (key) => f[key];

  const val = (x) => {
    if (!x) return null;
    if (x.stringValue !== undefined) return x.stringValue;
    if (x.booleanValue !== undefined) return x.booleanValue;
    if (x.integerValue !== undefined) return Number(x.integerValue);
    if (x.timestampValue !== undefined) return x.timestampValue;
    return null;
  };

  return {
    id,
    title: val(get("title")) || "",
    completed: Boolean(val(get("completed"))),
    uid: val(get("uid")) || "",
    createdAt: val(get("createdAt")) || "",
    updatedAt: val(get("updatedAt")) || "",
  };
}
