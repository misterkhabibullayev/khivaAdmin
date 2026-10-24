export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return true;

    const decoded = JSON.parse(atob(payloadBase64));
    if (!decoded.exp) return false;

    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};