import { http } from "./http";
import {
  collectionUrl,
  docUrl,
  toFirestoreFields,
  fromFirestoreDoc,
  requireProjectId,
} from "../utils/firestore";

function authHeader(idToken) {
  if (!idToken) throw new Error("Missing auth token");
  return { Authorization: `Bearer ${idToken}` };
}

export async function listTodosService({ idToken, uid }) {
  requireProjectId();

  // runQuery to filter by uid
  const url = `https://firestore.googleapis.com/v1/projects/${import.meta.env.VITE_FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`;

  const body = {
    structuredQuery: {
      from: [{ collectionId: "todos" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "uid" },
          op: "EQUAL",
          value: { stringValue: uid },
        },
      },
      orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
      limit: 200,
    },
  };

  const { data } = await http.post(url, body, { headers: authHeader(idToken) });

  // data is an array of results { document: {...} }
  const docs = (data || [])
    .map((row) => row.document)
    .filter(Boolean)
    .map(fromFirestoreDoc);

  return docs;
}

export async function createTodoService({ idToken, uid, title }) {
  const url = collectionUrl("todos");
  const now = new Date().toISOString();

  const payload = toFirestoreFields({
    uid,
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  });

  const { data } = await http.post(url, payload, { headers: authHeader(idToken) });
  return fromFirestoreDoc(data);
}

export async function updateTodoTitleService({ idToken, todoId, title }) {
  const url = `${docUrl("todos", todoId)}?updateMask.fieldPaths=title&updateMask.fieldPaths=updatedAt`;
  const now = new Date().toISOString();

  const payload = toFirestoreFields({
    title,
    updatedAt: now,
  });

  const { data } = await http.patch(url, payload, { headers: authHeader(idToken) });
  return fromFirestoreDoc(data);
}

export async function toggleTodoService({ idToken, todoId, completed }) {
  const url = `${docUrl("todos", todoId)}?updateMask.fieldPaths=completed&updateMask.fieldPaths=updatedAt`;
  const now = new Date().toISOString();

  const payload = toFirestoreFields({
    completed,
    updatedAt: now,
  });

  const { data } = await http.patch(url, payload, { headers: authHeader(idToken) });
  return fromFirestoreDoc(data);
}

export async function deleteTodoService({ idToken, todoId }) {
  const url = docUrl("todos", todoId);
  await http.delete(url, { headers: authHeader(idToken) });
  return true;
}
