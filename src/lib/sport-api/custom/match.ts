import { z } from "zod";
import { SportApiLogger } from "../core";
import { FixtureGet } from "../fixture/get";
import { TeamGet } from "../team/get";
import { TeamForm } from "../team/form";
import { MapPBGet } from "../map/pbget";
import { FixtureMetadata } from "../fixture/metadata";
import { SportInfo } from "~/lib/functions";
import { type UnwrapPromise } from "next/dist/lib/coalesced-function";
import { LocalCache } from "~/server/cache";
import { PlayerGet } from "../player/get";

export class CustomMatch {
  public static readonly Route = "CustomMatch";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),
  };

  public static Call = async (params: z.infer<typeof this.Zod.Params>) => {
    const CacheKey = `match-${params.id}`;

    type StoredCacheType = typeof Result;

    const CachedMatch = LocalCache.get<StoredCacheType>(CacheKey);

    if (CachedMatch) {
      SportApiLogger.info({
        date: new Date().toUTCString(),
        input: params,
        route: this.Route,
        cached: true,
      });

      return CachedMatch;
    }

    const fixture = await FixtureGet.Call({ id: params.id });

    if (!fixture) {
      return null;
    }

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

    type HalfFixture = Exclude<
      UnwrapPromise<ReturnType<typeof TeamForm.Call>>,
      null
    >["fixtures"][0];

    const _DetailedFixture = async (halfFixture: HalfFixture[]) => {
      const DetailedFixture = await Promise.all(
        halfFixture.map((fixture) => {
          return FixtureGet.Call({ id: fixture.fixtureId });
        })
      );

      return halfFixture.map((fixture) => {
        const HistoryFixture = DetailedFixture.find(
          (f) => f?.id === fixture.fixtureId
        );

        if (!HistoryFixture) {
          SportApiLogger.fatal(
            {
              fixture,
              params,
              route: this.Route,
            },
            "Error while fetching detailed fixture"
          );

          throw new Error("Error while fetching detailed fixture");
        }

        return {
          ...fixture,
          detail: HistoryFixture,
        };
      });
    };

    const _DetailedParti = async (parti: (typeof fixture.participants)[0]) => {
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

      const DetailedPlayers =
        team.most_recent_lineup && team.most_recent_lineup.length > 0
          ? await Promise.all(
              team.most_recent_lineup.map(async (player) => {
                const _detailPlayer = await PlayerGet.Call({ id: player.id });

                return {
                  ..._detailPlayer,
                  ...player,
                };
              })
            )
          : [];

      const DetailedTeam = {
        ...team,
        most_recent_lineup: DetailedPlayers,
      };

      if (!recent_matches) {
        return {
          ...parti,
          team: DetailedTeam,
          recent_matches,
        };
      }

      const DetailedRecentMatches = await _DetailedFixture(
        recent_matches.fixtures
      );

      return {
        ...parti,
        team: DetailedTeam,
        recent_matches: {
          ...recent_matches,
          fixtures: DetailedRecentMatches,
        },
      };
    };

    const _OpponentMatches = async (teams: typeof fixture.participants) => {
      const OpponentMatches = await TeamForm.Call({
        id: teams[0]!.id!,
        opponentId: teams[1]!.id!,
      });

      if (!OpponentMatches) {
        return null;
      }

      const DetailedOpponentMatches = await _DetailedFixture(
        OpponentMatches.fixtures
      );

      return {
        ...OpponentMatches,
        fixtures: DetailedOpponentMatches,
      };
    };

    const DetailPartiPromise = Promise.all(
      fixture.participants.map(_DetailedParti)
    );

    const OpponentMatchesPromise = _OpponentMatches(fixture.participants);

    const StreamsPromise = FixtureMetadata.Call({
      id: params.id,
      attribute: "streamUrl",
    });

    const PickBanPromise = MapPBGet.Call({
      id: params.id,
    });

    const [CompleteTeams, Streams, OpponentMatches, PickBan] =
      await Promise.all([
        DetailPartiPromise,
        StreamsPromise,
        OpponentMatchesPromise,
        PickBanPromise,
      ]);

    const TeamOne = CompleteTeams[0]!;
    const TeamTwo = CompleteTeams[1]!;

    const Sportinfo = SportInfo(fixture.sport.alias);

    if (!Sportinfo) {
      return null;
    }

    const Result = {
      ...fixture,
      participants: {
        one: TeamOne,
        two: TeamTwo,
      },
      stream: Streams,
      opponentMatches: OpponentMatches,
      pickBan: PickBan?.pickBan ?? null,
      sportInfo: Sportinfo,
    };

    LocalCache.set(CacheKey, Result, 10);

    SportApiLogger.info({
      date: new Date().toUTCString(),
      input: params,
      route: this.Route,
      cached: false,
    });

    return Result;
  };
}
