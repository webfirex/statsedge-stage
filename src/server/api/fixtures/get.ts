import { z } from "zod";
import { publicProcedure } from "../trpc";
import { SportApi } from "~/lib/sport-api";

const FixtureGetRouteInput = z.object({
  id: z.number().int(),
});

export const FixtureGetRoute = publicProcedure
  .input(FixtureGetRouteInput)
  .query(async ({ input }) => {
    const ApiMatch = await SportApi.Custom.Match.Call({
      id: input.id,
    });

    return ApiMatch;
  });
