import { z } from "zod";
import { SportApiLogger } from "../core";
import { FixtureGet } from "../fixture/get";
import { TeamGet } from "../team/get";
import { FixtureStream } from "../fixture/stream";
import { FixtureOdd } from "../fixture/odds";
import { TeamForm } from "../team/form";

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

    // const teamOne =

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

    const TeamOne = completeTeams[0]!;
    const TeamTwo = completeTeams[1]!;

    // const [TeamOneFixture, TeamTwoFixture] = await Promise.all([
    //   ParticipantRecent.Call(
    //     {
    //       teamId: TeamOne.id!,
    //     },
    //     {
    //       opponentTeamId: TeamTwo.id!,
    //       count: 5,
    //     }
    //   ),
    //   ParticipantRecent.Call(
    //     {
    //       teamId: TeamTwo.id!,
    //     },
    //     {
    //       opponentTeamId: TeamOne.id!,
    //       count: 5,
    //     }
    //   ),
    // ]);

    // const CompleteTeamOneFixtures = await Promise.all(
    //   TeamOneFixture!.fixtures.map(async (fixture) => {
    //     const completeFixture = await FixtureGet.Call({
    //       id: fixture.fixtureId,
    //     });

    //     if (!completeFixture) {
    //       SportApiLogger.fatal({
    //         fixture,
    //         params,
    //         route: this.Route,
    //       });

    //       throw new Error("Error while fetching fixture");
    //     }

    //     return {
    //       ...fixture,
    //       detail: completeFixture,
    //     };
    //   })
    // );

    const [stream, odds, hth, fmh, tmh] = await Promise.all([
      FixtureStream.Call({ id: params.id }),
      FixtureOdd.Call({ id: params.id }),
      TeamForm.Call({
        id: TeamOne.id ?? 0,
        opponentId: TeamTwo.id ?? 0,
      }),
      TeamForm.Call({ id: TeamOne.id ?? 0 }),
      TeamForm.Call({ id: TeamTwo.id ?? 0 }),
    ]);

    const TeamOneOdds = odds?.map_total_rounds_over_under ?? [];
    const TeamTwoOdds = odds?.map_total_rounds_over_under ?? [];

    return {
      ...fixture,
      participants: {
        one: TeamOne,
        two: TeamTwo,
      },
      odds: {
        one: TeamOneOdds,
        two: TeamTwoOdds,
      },
      hth,
      fmh,
      tmh,
      streams: stream?.streams,
    };
  };
}
