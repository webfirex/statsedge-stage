import type { NextApiRequest, NextApiResponse } from "next";
import { SportApi } from "~/lib/sport-api";
import { SportApiLogger } from "~/lib/sport-api/core";
import { TeamLogo } from "~/lib/sport-api/team/logo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "Bad Request" });
    }

    const safeTeamId = TeamLogo.Zod.Params.safeParse({
      teamId: parseInt(id),
    });

    if (!safeTeamId.success) {
      return res.status(400).end();
    }

    const logoRes = await SportApi.Team.Logo.Call(safeTeamId.data);

    if (!logoRes.ok) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const logoBuffer = await logoRes.buffer();

    res.setHeader("Content-Type", logoRes.headers.get("content-type")!);

    res.setHeader("Cache-Control", "public, max-age=43200, immutable");

    return res.status(200).send(logoBuffer);
  } catch (error) {
    SportApiLogger.error(
      {
        err: error,
      },
      "Error in /api/team/logo.ts"
    );

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const config = {
  api: {
    responseLimit: "10mb",
  },
};
