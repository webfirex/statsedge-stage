import { Card, Group, Image, SimpleGrid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Children, useEffect } from "react";
import { GAME_LIST } from "~/lib/data";
import { SelectedGameAtom } from "~/lib/jotai";
import { BREAKPOINTS } from "~/styles/globals";

export function AppGameSelector() {
    const [SelectedGame, setSelectedGame] = useAtom(SelectedGameAtom);

    const router = useRouter();

    const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);


    useEffect(() => {
        console.log(router)
        console.log('path', router.asPath)
        console.log('game', SelectedGame.game.toLowerCase())
        if (router.asPath.indexOf(SelectedGame.game.toLowerCase()) < 0) {
            // setSelectedGame(GAME_LIST[2])
            GAME_LIST.forEach(gameItem => {
                if (router.asPath.indexOf(gameItem.game.toLowerCase()) > 0) {
                    setSelectedGame(gameItem)
                }
            })
        } else {
            void router.push(`/matches?game=${SelectedGame.alias.toLowerCase()}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);


    return (
        <>
            <Card shadow="xl" radius="lg" px={BigThenMd ? "xl" : "xs"} py="lg">
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    {BigThenMd && (
                        <Group gap="xs">
                            <Text>Currently Selected:</Text>

                            <Text c="yellow" tt="uppercase">
                                {SelectedGame.game}
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
                                            setSelectedGame(game);
                                            void router.push(`/matches?game=${game.alias.toLowerCase()}`)
                                        }}
                                        src={game.icon}
                                        mah={BigThenMd ? 35 : 20}
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
