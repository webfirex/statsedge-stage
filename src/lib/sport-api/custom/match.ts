import { z } from "zod";
import { SportApiLogger } from "../core";
import { FixtureGet } from "../fixture/get";
import { TeamGet } from "../team/get";

export class CustomMatch {
  public static readonly Route = "CustomMatch";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),
  };

  public static Call = async (params: z.infer<typeof this.Zod.Params>) => {
    const fixture = await FixtureGet.Call({ id: params.id });

    if (!fixture) {
      return null;
    }

    // throw error if more then 2 parti
    if (fixture.participants.length !== 2) {
      SportApiLogger.fatal(
        {
          fixture,
          params,
          route: this.Route,
        },
        "More then 2 participants"
      );

      throw new Error("Error while fetching match");
    }

    const completeTeams = await Promise.all(
      fixture.participants.map(async (parti) => {
        if (!parti.id) {
          return {
            ...parti,
            team: null,
          };
        }

        const team = await TeamGet.Call({ id: parti.id });

        if (!team) {
          SportApiLogger.fatal({
            participant: parti,
            params,
            route: this.Route,
          });

          throw new Error("Error while fetching team");
        }

        return {
          ...parti,
          team,
        };

        // if (!team.most_recent_lineup) {
        //   return {
        //     ...parti,
        //     team,
        //   };
        // }

        // const completeMembers = await Promise.all(
        //   team.most_recent_lineup.map(async (member) => {
        //     const player = await PlayerGet.Call({ id: member.id });

        //     if (!player) {
        //       SportApiLogger.fatal({
        //         member,
        //         params: {
        //           matchId: params.id,
        //           playerId: member.id,
        //           teamId: parti.id,
        //         },
        //         route: this.Route,
        //       });

        //       throw new Error("Error while fetching player");
        //     }

        //     return player;
        //   })
        // );

        // return {
        //   ...parti,
        //   team: {
        //     ...team,
        //     most_recent_lineup: completeMembers,
        //   },
        // };
      })
    );

    return {
      ...fixture,
      participants: {
        one: completeTeams[0]!,
        two: completeTeams[1]!,
      },
    };
  };
}
