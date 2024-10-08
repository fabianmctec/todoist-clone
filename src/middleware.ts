import { defineMiddleware, sequence } from "astro:middleware";
import { getSession } from "auth-astro/server";

const auth = defineMiddleware(async (context, next) => {
  const isSession = await getSession(context.request);
  const isHome = context.url.pathname.includes("/app");

  if (isHome && !isSession) {
    return context.redirect("/");
  } else if (!isHome && isSession) {
    return context.redirect("/app");
  }
  return next();
});

export const onRequest = sequence(auth);
