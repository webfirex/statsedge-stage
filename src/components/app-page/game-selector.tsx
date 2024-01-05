import { Card, Group, Image, SimpleGrid, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { Children } from "react";
import { GAME_LIST } from "~/lib/data";
import { SelectedGameAtom } from "~/lib/jotai";

export function AppGameSelector() {
  const [SelectedGame, setSelectedGame] = useAtom(SelectedGameAtom);

  return (
    <>
      <Card shadow="xl" radius="lg" px="xl" py="lg">
        <SimpleGrid cols={2}>
          <Group gap="xs">
            <Text>Currently Selected:</Text>

            <Text c="yellow" tt="uppercase">
              {SelectedGame.game}
            </Text>
          </Group>

          <Group gap="xl" justify="end">
            <Image
              src="/box.svg"
              mah={35}
              alt="box"
              fit="contain"
              style={{
                cursor: "pointer",
              }}
            />

            {Children.toArray(
              GAME_LIST.map((game) => (
                <>
                  <Image
                    onClick={() => setSelectedGame(game)}
                    src={game.icon}
                    mah={35}
                    alt={game.game}
                    fit="contain"
                    style={{
                      cursor: "pointer",
                      filter:
                        game.game === SelectedGame.game
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
