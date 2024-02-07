import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/trpc/fixture.list",
    "/api/trpc/fixture.get",
    "/api/team/logo",
    "/matches",
    "/matches/:id",
    "/player/:id",
    "/team/:id",
    "/bonuses",
    "/props",
    "/tools/1",
    "/tools/2",
    "/tools",
    "/api/dota/hero",
    "/api/dota/item",
    "/api/lol/hero",
    "/api/lol/item",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
