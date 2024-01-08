import { z } from "zod";
import { SportApiCore } from "../core";

export class TeamLogo {
  public static BaseUrl = "https://img.gamescorekeeper.com";
  public static Path = "/logo/participant/";

  public static Zod = {
    Params: z.object({
      teamId: z.number(),
    }),

    Response: null,
  };

  public static Call = async (params: z.infer<typeof this.Zod.Params>) => {
    const validatedParams = this.Zod.Params.parse(params);

    const url = new URL(`${this.BaseUrl}${this.Path}${validatedParams.teamId}`);

    const res = await SportApiCore.Request({
      url: url.toString(),
      method: "GET",
    });

    return res;
  };
}
