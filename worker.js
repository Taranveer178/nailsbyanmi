import { onRequestPost } from "./functions/api/booking.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/booking") {
      if (request.method !== "POST") {
        return Response.json(
          { ok: false, message: "Method not allowed." },
          { status: 405, headers: { Allow: "POST" } },
        );
      }

      return onRequestPost({ request, env });
    }

    if (pathname.startsWith("/api/")) {
      return Response.json(
        { ok: false, message: "Not found." },
        { status: 404 },
      );
    }

    return env.ASSETS.fetch(request);
  },
};
