export { auth as proxy } from "@/auth";

export const config = {
  matcher: [
    "/((?!api/auth|login|_next/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
