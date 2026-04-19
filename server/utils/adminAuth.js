import crypto from "node:crypto";

const ADMIN_EMAIL = "parasgul102@gmail.com";
const ADMIN_PASSWORD = "parasfyp";
const ADMIN_NAME = "Paras Gul";
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET ?? "bridal-admin-secret";

export function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function getSeedAdmin() {
  return {
    email: ADMIN_EMAIL,
    passwordHash: hashPassword(ADMIN_PASSWORD),
    name: ADMIN_NAME,
  };
}

export function signAdminToken(admin) {
  const payload = `${admin._id}:${admin.email}`;
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(payload)
    .digest("hex");

  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifyAdminToken(token) {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [id, email, signature] = decoded.split(":");

    if (!id || !email || !signature) {
      return null;
    }

    const expectedSignature = crypto
      .createHmac("sha256", TOKEN_SECRET)
      .update(`${id}:${email}`)
      .digest("hex");

    if (signature !== expectedSignature) {
      return null;
    }

    return { id, email };
  } catch {
    return null;
  }
}
