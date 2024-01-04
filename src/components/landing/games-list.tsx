import { Center, Group, Image } from "@mantine/core";
import { Children } from "react";

const GAME_LIST = [
  "/lol.svg",
  "/csgo.svg",
  "/valo.svg",
  "/bull.svg",
  "/vec.svg",
  "/cod.svg",
];

export function GameListComp() {
  return (
    <>
      <Center>
        <Group gap="xl" grow>
          {Children.toArray(
            GAME_LIST.map((game) => (
              <Image
                src={game}
                mah={35}
                alt="game"
                style={{
                  filter: "grayscale(100%)",
                }}
              />
            ))
          )}
        </Group>
      </Center>
    </>
  );
}
