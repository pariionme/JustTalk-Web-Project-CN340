import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { adminAuth } from "./firebase-admin";

const secretKey = process.env.COOKIE_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(idToken: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId: decodedToken.uid, expiresAt });

    (await cookies()).set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });

    return { success: true };
  } catch (error) {
    console.error("Session creation error:", error);
    throw new Error("Failed to create session");
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
  return { success: true };
}

export async function getSession() {
  const userSession = (await cookies()).get("session");

  if (!userSession) return  { success: false }

  return { success: true, session: userSession}
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
