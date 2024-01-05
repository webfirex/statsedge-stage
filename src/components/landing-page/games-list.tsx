import { Center, Image, SimpleGrid, rem } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Children } from "react";

const GAME_LIST = [
  "/lol.svg",
  "/csgo.svg",
  "/valo.svg",
  "/bull.svg",
  "/vec.svg",
  "/cod.svg",
];

function GameComp({ src }: { src: string }) {
  const { hovered, ref } = useHover<HTMLImageElement>();

  return (
    <Image
      ref={ref}
      src={src}
      mah={50}
      alt="game"
      fit="contain"
      style={{
        cursor: "pointer",
        filter: hovered ? "grayscale(0)" : "grayscale(1)",
      }}
    />
  );
}

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
          {Children.toArray(GAME_LIST.map((game) => <GameComp src={game} />))}
        </SimpleGrid>
      </Center>
    </>
  );
}
