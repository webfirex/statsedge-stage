import { SportApi } from "~/lib/sport-api";
import { publicProcedure } from "../trpc";
import { SportApiLogger } from "~/lib/sport-api/core";
import { ArrayPagination, NumTimeToDayStartTime } from "~/lib/functions";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const FixtureListRouteInput = z.object({
  upcoming: z.boolean(),
  page: z.number().int(),
  pageCount: z.number().int(),
  sport: z.string(),
  from: z.string(),
  to: z.string(),
});

export const FixtureListRoute = publicProcedure
  .input(FixtureListRouteInput)
  .query(async ({ input }) => {
    try {
      type FixtureList = z.infer<
        typeof SportApi.Fixtures.List.Zod.Response
      >["fixtures"][0][];

      const AllFixtures: FixtureList = [];

      let page = 1;
      const per = 50;
      let total = 0;

      let fetchNext = true;

      /**
       * TODO: Fix this when the API is fixed
       *
       * The current Query can be faster
       */
      while (fetchNext) {
        const res = await SportApi.Fixtures.List.Call({
          from: input.from,
          to: input.to,
          sport: input.sport,
          page,
          pageCount: per,
        });

        AllFixtures.push(...res.fixtures);

        total += res.totalCount;

        if (res.totalCount < per) {
          fetchNext = false;
        }

        page++;
      }

      const FilteredFixtures = AllFixtures.filter((x) => {
        if (input.upcoming) {
          return x.status === "Scheduled" || x.status === "Started";
        } else {
          return x.status === "Ended";
        }
      }).sort((a, b) => a.scheduledStartTime - b.scheduledStartTime);

      total = FilteredFixtures.length;

      const DividedFixtures: {
        day: number;
        fixtures: FixtureList;
      }[] = [];

      for (const fixture of ArrayPagination({
        array: FilteredFixtures,
        limit: input.pageCount,
        page: input.page,
      })) {
        const date = NumTimeToDayStartTime(fixture.scheduledStartTime);

        const index = DividedFixtures.findIndex((x) => x.day === date);

        /**
         * * If you wanna add any custom data to the fixture
         * * you can do it here
         */
        const finalFixture = {
          ...fixture,
        };

        if (index === -1) {
          DividedFixtures.push({
            day: date,
            fixtures: [finalFixture],
          });
        } else {
          DividedFixtures[index]!.fixtures.push(finalFixture);
        }
      }

      const sortedResult = DividedFixtures.sort((a, b) => a.day - b.day);

      return {
        data: {
          fixtures: sortedResult,
          total,
        },
      };
    } catch (error) {
      SportApiLogger.error(
        {
          err: error,
          route: "FixtureListRoute",
          input: input,
        },
        "Error fetching fixture list"
      );

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error fetching fixture list",
      });
    }
  });
