import { Card, Group, Image, SimpleGrid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Children } from "react";
import { SPORT_INFO } from "~/lib/data";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchSportSelectorProps {
  sport: (typeof SPORT_INFO)[0];
  setSport: (sport: (typeof SPORT_INFO)[0]) => void;
  disabled?: boolean;
}

export function MatchSportSelector(props: MatchSportSelectorProps) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <>
      <Card shadow="xl" radius="lg" px={BigThenMd ? "xl" : "xs"} py="lg">
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {BigThenMd && (
            <Group gap="xs">
              <Text>Currently Selected:</Text>

              <Text c="yellow" tt="uppercase">
                {props.sport.name}
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
              SPORT_INFO.map((game) => (
                <>
                  <Image
                    onClick={() => {
                      if (props.disabled) return;

                      props.setSport(game);
                    }}
                    src={game.logo}
                    mah={BigThenMd ? 35 : 20}
                    alt={game.name}
                    fit="contain"
                    style={{
                      cursor: props.disabled ? "normal" : "pointer",
                      filter:
                        game.alias === props.sport.alias
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
