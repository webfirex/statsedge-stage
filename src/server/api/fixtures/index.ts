import { createTRPCRouter } from "../trpc";
import { FixtureGetRoute } from "./get";
import { FixtureListRoute } from "./list";

export const fixtureRouter = createTRPCRouter({
  list: FixtureListRoute,
  get: FixtureGetRoute,
});
