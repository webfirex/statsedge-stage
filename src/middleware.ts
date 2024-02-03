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
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
