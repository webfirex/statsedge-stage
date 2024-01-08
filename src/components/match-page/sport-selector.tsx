import { Card, Group, Image, SimpleGrid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai/react";
import { Children } from "react";
import { GAME_LIST } from "~/lib/data";
import { GameLogoUrl } from "~/lib/functions";
import { MatchesPageAtom } from "~/lib/jotai/matches";
import { BREAKPOINTS } from "~/styles/globals";

export function MatchSportSelector() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const [Query, setQuery] = useAtom(MatchesPageAtom);

  return (
    <>
      <Card shadow="xl" radius="lg" px={BigThenMd ? "xl" : "xs"} py="lg">
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {BigThenMd && (
            <Group gap="xs">
              <Text>Currently Selected:</Text>

              <Text c="yellow" tt="uppercase">
                {Query.sport_name}
              </Text>
            </Group>
          )}

          <Group gap="xl" justify={BigThenMd ? "end" : "center"}>
            {BigThenMd && (
              <Image
                src="/box.svg"
                mah={BigThenMd ? 35 : 20}
                alt="box"
                fit="contain"
                style={{
                  cursor: "pointer",
                }}
              />
            )}

            {Children.toArray(
              GAME_LIST.map((game) => (
                <>
                  <Image
                    onClick={() => {
                      setQuery((_query) => {
                        _query.sport = game.alias;
                        _query.sport_name = game.game;
                        _query.tab = "all";
                      });
                    }}
                    src={GameLogoUrl(game.alias)}
                    mah={BigThenMd ? 35 : 20}
                    alt={game.game}
                    fit="contain"
                    style={{
                      cursor: "pointer",
                      filter:
                        game.alias === Query.sport
                          ? "drop-shadow(0px 0px 30px var(--mantine-color-yellow-9))"
                          : "grayscale(1)",
                    }}
                  />
                </>
              ))
            )}
          </Group>
        </SimpleGrid>
      </Card>
    </>
  );
}
