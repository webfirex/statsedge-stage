import { z } from "zod";
import { SportApiLogger } from "../core";
import { FixtureGet } from "../fixture/get";
import { TeamGet } from "../team/get";
import { TeamForm } from "../team/form";
import { MapPBGet } from "../map/pbget";
import { FixtureMetadata } from "../fixture/metadata";

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

    // throw error if more then 2 teams
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

    const CompleteTeamsPromise = Promise.all(
      fixture.participants.map(async (parti) => {
        if (!parti.id) {
          return {
            ...parti,
            team: null,
            recent_matches: null,
          };
        }

        const [team, recent_matches] = await Promise.all([
          TeamGet.Call({ id: parti.id }),
          TeamForm.Call({
            id: parti.id,
          }),
        ]);

        if (!team) {
          SportApiLogger.fatal({
            participant: parti,
            params,
            route: this.Route,
          });

          throw new Error("Error while fetching team");
        }

        if (recent_matches?.fixtures) {
          const AllHistoryFixture = await Promise.all(
            recent_matches.fixtures.map(async (fixture) => {
              return await FixtureGet.Call({ id: fixture.fixtureId });
            })
          );

          const result = recent_matches.fixtures.map((fixture) => {
            const HistoryFixture = AllHistoryFixture.find(
              (f) => f?.id === fixture.fixtureId
            );

            if (!HistoryFixture) {
              return {
                ...fixture,
                fixture: null,
              };
            }

            return {
              ...fixture,
              fixture: HistoryFixture,
            };
          });

          recent_matches.fixtures = result;
        }

        return {
          ...parti,
          team,
          recent_matches,
        };
      })
    );

    const OpponentMatchesPromise = async () => {
      const opponentMatches = await TeamForm.Call({
        id: fixture.participants[0]!.id!,
        opponentId: fixture.participants[1]!.id!,
      });

      if (!opponentMatches?.fixtures) {
        return null;
      }

      const AllHistoryFixture = await Promise.all(
        opponentMatches.fixtures.map(async (fixture) => {
          return await FixtureGet.Call({ id: fixture.fixtureId });
        })
      );

      const result = opponentMatches.fixtures.map((fixture) => {
        const HistoryFixture = AllHistoryFixture.find(
          (f) => f?.id === fixture.fixtureId
        );

        if (!HistoryFixture) {
          return {
            ...fixture,
            fixture: null,
          };
        }

        return {
          ...fixture,
          fixture: HistoryFixture,
        };
      });

      opponentMatches.fixtures = result;

      return opponentMatches;
    };

    const StreamsPromise = FixtureMetadata.Call({
      id: params.id,
      attribute: "streamUrl",
    });

    const MapsPromise = MapPBGet.Call({
      id: params.id,
    });

    const [CompleteTeams, Streams, OpponentMatches, Maps] = await Promise.all([
      CompleteTeamsPromise,
      StreamsPromise,
      OpponentMatchesPromise(),
      MapsPromise,
    ]);

    const TeamOne = CompleteTeams[0]!;
    const TeamTwo = CompleteTeams[1]!;

    return {
      ...fixture,
      participants: {
        one: TeamOne,
        two: TeamTwo,
      },
      streams: Streams,
      opponentMatches: OpponentMatches,
      maps: Maps,
    };
  };
}
