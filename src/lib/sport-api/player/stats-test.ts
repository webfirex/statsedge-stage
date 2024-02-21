import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";
import { SportApiLOLStatsZod } from "./stats-zod";

export class PlayerStatsTest {
  public static readonly Route = "PlayerStatsTest";
  public static readonly Path =
    "https://api.pandascore.co/lol/players/faker/stats";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        id: z.number().int(),
        image_url: z.string().nullable(),
        first_name: z.string().nullable(),
        active: z.boolean(),
        age: z.number().int().nullable(),
        birthday: z.string().nullable(),
        current_team: z
          .object({
            acronym: z.string().nullable(),
            id: z.number().int(),
            image_url: z.string().nullable(),
            location: z.string().nullable(),
            modified_at: z.string(),
            name: z.string(),
            slug: z.string().nullable(),
          })
          .nullable(),

        current_videogame: z
          .object({
            id: z.number().int(),
            name: z.string(),
            slug: z.string(),
          })
          .nullable(),

        favorite_champions: z.array(
          z.object({
            champion: SportApiLOLStatsZod.LOLChampion,
            games_count: z.number().int(),
            games_lost: z.number().int(),
            games_won: z.number().int(),
            most_used_items: z.array(
              z.object({
                count: z.number().int(),
                id: z.number().int(),
                name: z.string(),
              })
            ),
          })
        ),

        last_games: z.array(
          z.object({
            assists: z.number().int(),
            champion: SportApiLOLStatsZod.LOLChampion.nullable(),
            creep_score: z.number().int(),
            cs_at_14: z.number().int(),
            deaths: z.number().int(),
          })
        ),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const url = SportApiCore.URL(`${this.Path}/${params.id}`);

    console.log(url.toString());

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
