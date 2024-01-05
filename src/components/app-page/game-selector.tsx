import { Card, Group, Image, SimpleGrid, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { Children } from "react";
import { GAME_LIST } from "~/lib/data";
import { SelectedGameAtom } from "~/lib/jotai";

export function AppGameSelector() {
  const [SelectedGame, setSelectedGame] = useAtom(SelectedGameAtom);

  return (
    <>
      <Card shadow="xl" radius="lg" p="xl">
        <SimpleGrid cols={2}>
          <Text c="yellow" tt="uppercase" my="auto">
            {SelectedGame.game}
          </Text>

          <Group gap="xl" justify="end">
            <Image
              src="/box.svg"
              mah={40}
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
                    mah={40}
                    alt={game.game}
                    fit="contain"
                    style={{
                      cursor: "pointer",
                      filter:
                        game.game === SelectedGame.game
                          ? "grayscale(0)"
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
