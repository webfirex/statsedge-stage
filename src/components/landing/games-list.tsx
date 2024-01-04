import { Center, Image, SimpleGrid, rem } from "@mantine/core";
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
        <SimpleGrid
          spacing={{ base: rem(50), md: rem(100) }}
          cols={{
            base: 3,
            md: 6,
          }}
        >
          {Children.toArray(
            GAME_LIST.map((game) => (
              <Image
                src={game}
                mah={50}
                alt="game"
                fit="contain"
                style={{
                  filter: "grayscale(100%)",
                }}
              />
            ))
          )}
        </SimpleGrid>
      </Center>
    </>
  );
}
