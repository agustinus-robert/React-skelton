import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

export interface JwtPayload {
  id: number;
  username: string;
}

export function signToken(payload: object) {
  return jwt.sign(payload, secret!, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secret!) as JwtPayload;
}
