import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { LOLItems } from "~/lib/parser";
import { SportApiLogger } from "~/lib/sport-api/core";

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

    const safeTeamId = z.string().regex(/^\d+$/).safeParse(id);

    if (!safeTeamId.success) {
      return res.status(400).end();
    }

    const itemList = await LOLItems();

    const item = itemList[safeTeamId.data];

    if (!item) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.setHeader("Cache-Control", "public, max-age=43200, immutable");

    return res.redirect(301, item.image);
  } catch (error) {
    SportApiLogger.error(
      {
        err: error,
      },
      "Error in /api/lol/item.ts"
    );

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
