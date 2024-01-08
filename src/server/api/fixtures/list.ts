import { SportApi } from "~/lib/sport-api";
import { publicProcedure } from "../trpc";
import { SportApiLogger } from "~/lib/sport-api/core";
import { ArrayPagination, NumTimeToDayStartTime } from "~/lib/functions";
import { type z } from "zod";
import { TRPCError } from "@trpc/server";

export const FixtureListRoute = publicProcedure
  .input(SportApi.Fixtures.List.Zod.Params)
  .query(async ({ input }) => {
    try {
      if (!input.pageCount || !input.page) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing page or pageCount",
        });
      }

      type FixtureList = z.infer<
        typeof SportApi.Fixtures.List.Zod.Response
      >["fixtures"][0][];

      const AllFixtures: FixtureList = [];

      let page = 1;
      const per = 50;
      let total = 0;

      let fetchNext = true;

      // TODO: Fix this when the API is fixed
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

      const DividedFixtures: {
        day: number;
        fixtures: FixtureList;
      }[] = [];

      for (const fixture of ArrayPagination({
        array: AllFixtures,
        limit: input.pageCount,
        page: input.page,
      })) {
        const date = NumTimeToDayStartTime(fixture.scheduledStartTime);

        const index = DividedFixtures.findIndex((x) => x.day === date);

        if (index === -1) {
          DividedFixtures.push({
            day: date,
            fixtures: [fixture],
          });
        } else {
          DividedFixtures[index]!.fixtures.push(fixture);
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
