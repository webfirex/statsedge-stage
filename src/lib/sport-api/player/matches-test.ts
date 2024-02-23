import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class LOLMatchTest {
  public static readonly Route = "LOLMatchTest";
  public static readonly Path = "https://api.pandascore.co/lol/matches";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        id: z.number(),
        games: z.array(
          z.object({
            id: z.number(),
            players: z.array(
              z.object({
                assists: z.number(),
                deaths: z.number(),
                kills: z.number(),
                player_id: z.number(),
              })
            ),
          })
        ),
      })
      .nullable()
      .transform((data) => {
        if (!data) {
          return null;
        }

        return {
          ...data,
          final: data.games.reduce(
            (acc, game) => {
              return {
                assists:
                  acc.assists +
                  game.players.reduce((acc, player) => acc + player.assists, 0),
                deaths:
                  acc.deaths +
                  game.players.reduce((acc, player) => acc + player.deaths, 0),
                kills:
                  acc.kills +
                  game.players.reduce((acc, player) => acc + player.kills, 0),
              };
            },
            { assists: 0, deaths: 0, kills: 0 }
          ),
        };
      })
      .transform((data) => {
        if (!data) {
          return null;
        }

        return {
          ...data,
          final: {
            ...data.final,
            // allow 2 decimal places
            kd: parseFloat((data.final.kills / data.final.deaths).toFixed(2)),
          },
        };
      }),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    // const url = SportApiCore.URL(`${this.Path}`);

    const url = new URL(`${this.Path}/${params.id}`);

    url.searchParams.append(
      "token",
      "IVOpUlw-Q9FG4nt6Zlz2RUJvCcK0yAaNBMkJxZ-UBZPDZA1YNIA"
    );

    const rawRes = await SportApiCore.Request({
      url: url.toString(),
      method: "GET",
    });

    if (!rawRes.ok) {
      // 404
      if (rawRes.status === 404) {
        SportApiLogger.warn({
          err: {
            status: rawRes.status,
            statusText: rawRes.statusText,
          },
          url: url.toString(),
          input: params,
          route: this.Route,
        });

        return null;
      }

      SportApiLogger.error({
        err: {
          status: rawRes.status,
          statusText: rawRes.statusText,
        },
        url: url.toString(),
        input: params,
        route: this.Route,
      });

      throw new Error(`${this.Route}: Error while fetching player`);
    }

    const rawData: unknown = await rawRes.json();

    const validatedRes = this.Zod.Response.safeParse(rawData);

    if (!validatedRes.success) {
      SportApiLogger.error({
        err: validatedRes.error,
        json: rawData,
        input: params,
        route: this.Route,
      });

      throw new Error(`${this.Route}: Error while parsing player`);
    }

    return validatedRes.data;
  };
}
