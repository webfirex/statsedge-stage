import { createTRPCRouter } from "../trpc";
import { FixtureListRoute } from "./list";

export const fixtureRouter = createTRPCRouter({
  list: FixtureListRoute,
});
