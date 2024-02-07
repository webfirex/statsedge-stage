import { z } from "zod";
import fetch from "node-fetch";
import { LocalCache } from "~/server/cache";

export const LOLChamp = async () => {
  const CacheKey = "LOLChamp";
  const CacheTime = 60 * 60; // 1 hour, in seconds

  type StoredCache = typeof data;

  const cachedData = LocalCache.get<StoredCache>(CacheKey);

  if (cachedData) {
    console.log({
      key: CacheKey,
      cached: true,
    });

    return cachedData;
  }

  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const rawData: unknown = await res.json();

  const schema = z.object({
    data: z.record(
      z.string(),
      z.object({
        name: z.string(),
        version: z.string(),
        key: z.string().transform((key) => Number(key)),
        image: z.object({
          full: z.string(),
          group: z.string(),
        }),
      })
    ),
  });

  const parsedJSON = schema.parse(rawData);

  const data = Object.values(parsedJSON.data).reduce((acc, champ) => {
    return {
      ...acc,
      [champ.key]: {
        name: champ.name,
        image: `https://ddragon.leagueoflegends.com/cdn/${champ.version}/img/${champ.image.group}/${champ.image.full}`,
      },
    };
  }, {} as Record<string, { name: string; image: string }>);

  LocalCache.set(CacheKey, data, CacheTime);

  console.log({
    key: CacheKey,
    cached: false,
  });

  return data;
};

export const LOLItems = async () => {
  const CacheKey = "LOLItems";
  const CacheTime = 60 * 60; // 1 hour, in seconds

  type StoredCache = typeof data;

  const cachedData = LocalCache.get<StoredCache>(CacheKey);

  if (cachedData) {
    console.log({
      key: CacheKey,
      cached: true,
    });

    return cachedData;
  }

  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/item.json"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const rawData: unknown = await res.json();

  const schema = z.object({
    version: z.string(),
    data: z.record(
      z.string(),
      z.object({
        name: z.string(),
        image: z.object({
          full: z.string(),
          group: z.string(),
        }),
      })
    ),
  });

  const parsedJSON = schema.parse(rawData);

  const data = Object.entries(parsedJSON.data).reduce((acc, [key, item]) => {
    return {
      ...acc,
      [key]: {
        name: item.name,
        image: `https://ddragon.leagueoflegends.com/cdn/${parsedJSON.version}/img/${item.image.group}/${item.image.full}`,
      },
    };
  }, {} as Record<string, { name: string; image: string }>);

  LocalCache.set(CacheKey, data, CacheTime);

  console.log({
    key: CacheKey,
    cached: false,
  });

  return data;
};

export const DOTAHeroes = async () => {
  const CacheKey = "DOTAHeroes";
  const CacheTime = 60 * 60; // 1 hour, in seconds

  type StoredCache = typeof data;

  const cachedData = LocalCache.get<StoredCache>(CacheKey);

  if (cachedData) {
    console.log({
      key: CacheKey,
      cached: true,
    });

    return cachedData;
  }

  const res = await fetch("https://api.opendota.com/api/constants/heroes");

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const rawData: unknown = await res.json();

  const schema = z.record(
    z.string(),
    z.object({
      localized_name: z.string(),
      img: z.string(),
      icon: z.string(),
    })
  );

  const parsedJSON = schema.parse(rawData);

  const data = Object.entries(parsedJSON).reduce((acc, [key, hero]) => {
    return {
      ...acc,
      [key]: {
        name: hero.localized_name,
        image: `https://cdn.cloudflare.steamstatic.com${hero.img}`,
        icon: `https://cdn.cloudflare.steamstatic.com${hero.icon}`,
      },
    };
  }, {} as Record<string, { name: string; image: string; icon: string }>);

  LocalCache.set(CacheKey, data, CacheTime);

  console.log({
    key: CacheKey,
    cached: false,
  });

  return data;
};

// https://api.opendota.com/api/constants/items

export const DOTAItems = async () => {
  const CacheKey = "DOTAItems";
  const CacheTime = 60 * 60; // 1 hour, in seconds

  type StoredCache = typeof data;

  const cachedData = LocalCache.get<StoredCache>(CacheKey);

  if (cachedData) {
    console.log({
      key: CacheKey,
      cached: true,
    });

    return cachedData;
  }

  const res = await fetch("https://api.opendota.com/api/constants/items");

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const rawData: unknown = await res.json();

  const schema = z.record(
    z.string(),
    z.object({
      id: z.number(),
      img: z.string(),
    })
  );

  const parsedJSON = schema.parse(rawData);

  const data = Object.values(parsedJSON).reduce((acc, item) => {
    return {
      ...acc,
      [item.id]: {
        image: `https://cdn.cloudflare.steamstatic.com${item.img}`,
      },
    };
  }, {} as Record<string, { image: string }>);

  LocalCache.set(CacheKey, data, CacheTime);

  console.log({
    key: CacheKey,
    cached: false,
  });

  return data;
};
