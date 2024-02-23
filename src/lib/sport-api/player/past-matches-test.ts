import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class PlayerPastMatchesTest {
  public static readonly Route = "PastPlayerMatchesTest";
  public static readonly Path = "https://api.pandascore.co/players/585/matches";

  public static readonly Zod = {
    // Params: z.object({
    //   id: z.number(),
    // }),

    Response: z.array(
      z.object({
        id: z.number(),
        opponents: z.array(
          z.object({
            opponent: z.object({
              id: z.number(),
              image_url: z.string().nullable(),
              name: z.string(),
              acronym: z.string(),
            }),
          })
        ),
        results: z.array(
          z.object({
            score: z.number(),
            team_id: z.number(),
          })
        ),
      })
    ),
  };

  public static Call = async (): // params: z.infer<typeof this.Zod.Params>
  Promise<z.infer<typeof this.Zod.Response>> => {
    // const url = SportApiCore.URL(`${this.Path}`);

    const url = new URL(this.Path);

    url.searchParams.append("filter[finished]", "true");
    // url.searchParams.append("page[size]", "1");

    url.searchParams.append(
      "token",
      "IVOpUlw-Q9FG4nt6Zlz2RUJvCcK0yAaNBMkJxZ-UBZPDZA1YNIA"
    );

    const rawRes = await SportApiCore.Request({
      url: url.toString(),
      method: "GET",
    });

    if (!rawRes.ok) {
      SportApiLogger.error({
        err: {
          status: rawRes.status,
          statusText: rawRes.statusText,
        },
        url: url.toString(),
        // input: params,
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
        // input: params,
        route: this.Route,
      });

      throw new Error(`${this.Route}: Error while parsing player`);
    }

    return validatedRes.data;
  };
}
