import { http } from "./http";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

function requireApiKey() {
  if (!API_KEY) throw new Error("Missing VITE_FIREBASE_API_KEY in .env");
}

export async function signupService(email, password) {
  requireApiKey();
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  const { data } = await http.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  return normalizeAuthResponse(data);
}

export async function loginService(email, password) {
  requireApiKey();
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  const { data } = await http.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  return normalizeAuthResponse(data);
}

export async function lookupService(idToken) {
  requireApiKey();
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
  const { data } = await http.post(url, { idToken });
  const user = data?.users?.[0];
  if (!user) throw new Error("Invalid session");
  return user;
}

function normalizeAuthResponse(data) {
  const expiresInSec = Number(data.expiresIn || 0);
  const expiresAt = Date.now() + expiresInSec * 1000;

  return {
    idToken: data.idToken,
    refreshToken: data.refreshToken,
    uid: data.localId,
    email: data.email,
    expiresAt,
  };
}
