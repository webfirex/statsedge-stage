import {
  Card,
  Center,
  Divider,
  Flex,
  Image,
  Overlay,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Children } from "react";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";
import { MatchMapPickBanComp } from "./pick-ban";

interface MatchMapsProps {
  match: MatchType;
}

export function MatchMapsComp({ match }: MatchMapsProps) {
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  return (
    <>
      <SimpleGrid
        cols={{
          base: 1,
          md: match.status === "Scheduled" ? 2 : 1,
        }}
      >
        <Card p="lg">
          <Stack>
            <Title order={5}>MAPS</Title>

            <SimpleGrid
              cols={{
                base: 1,
                md:
                  match.status === "Scheduled"
                    ? 1
                    : match.sportInfo.alias === "codmwiii"
                    ? 2
                    : 1,
              }}
              spacing="xl"
            >
              <Stack>
                <Divider />

                {(() => {
                  if (!match?.pickBan) {
                    return (
                      <Center>
                        <Text>No maps found</Text>
                      </Center>
                    );
                  }

                  return (
                    <>
                      <SimpleGrid
                        cols={{
                          base: match.sportInfo.alias === "codmwiii" ? 3 : 1,
                          md: match.sportInfo.alias === "codmwiii" ? 4 : 1,
                        }}
                      >
                        {Children.toArray(
                          match.pickBan.map((map) => (
                            <>
                              <Card
                                style={{
                                  backgroundImage: "url(/map.jpg)",
                                }}
                              >
                                <Overlay
                                  style={{
                                    zIndex: 1,
                                  }}
                                />
                                <div
                                  style={{
                                    zIndex: 2,
                                  }}
                                >
                                  {match.status === "Scheduled" && (
                                    <Flex align="center" justify="center">
                                      <Title order={3} ta="center">
                                        {map.mapName}
                                      </Title>
                                    </Flex>
                                  )}

                                  {match?.status !== "Scheduled" &&
                                    ["cs2", "valorant"].includes(
                                      match.sportInfo.alias
                                    ) && (
                                      <Flex
                                        align="center"
                                        justify="space-between"
                                      >
                                        <Title order={3}>{map.mapName}</Title>
                                        <Flex
                                          justify="space-between"
                                          align="center"
                                          gap={SmallThenSm ? "sm" : "xl"}
                                        >
                                          <Flex
                                            direction="column"
                                            align="center"
                                            justify="center"
                                          >
                                            <Image
                                              src={`/api/team/logo?id=${match.participants.one.id}`}
                                              alt="league logo"
                                              fit="contain"
                                              h={30}
                                              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                            />
                                            <Text c="red">
                                              {/* {map.[0]?.roundsWon} */}
                                              as
                                            </Text>
                                          </Flex>
                                          <Flex
                                            direction="column"
                                            align="center"
                                            bg="black"
                                            p="sm"
                                          >
                                            <Text size="sm">Stats</Text>
                                            <Text>
                                              {/* {
                                                    map.roundScores[0]
                                                      ?.halfScores[0]
                                                  }
                                                  :
                                                  {
                                                    map.roundScores[1]
                                                      ?.halfScores[0]
                                                  }
                                                  &nbsp;|&nbsp;
                                                  {
                                                    map.roundScores[0]
                                                      ?.halfScores[1]
                                                  }
                                                  :
                                                  {
                                                    map.roundScores[1]
                                                      ?.halfScores[1]
                                                  } */}
                                              s
                                            </Text>
                                          </Flex>
                                          <Flex
                                            direction="column"
                                            align="center"
                                          >
                                            <Image
                                              src={`/api/team/logo?id=${match.participants.two.id}`}
                                              alt="league logo"
                                              fit="contain"
                                              h={30}
                                              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                            />
                                            <Text c="green">
                                              {/* {map.roundScores[1]?.roundsWon} */}
                                              s
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Flex>
                                    )}

                                  {match.status !== "Scheduled" &&
                                    match?.sportInfo?.alias === "codmwiii" && (
                                      <SimpleGrid cols={{ base: 1, md: 1 }}>
                                        <Title order={5}>TBA</Title>
                                        <Divider />
                                        <Text size="sm">Terminal</Text>
                                        <Flex
                                          justify="space-between"
                                          align="center"
                                          gap="xs"
                                        >
                                          <Flex
                                            direction="column"
                                            align="center"
                                            justify="center"
                                          >
                                            <Image
                                              src={`/api/team/logo?id=${match.participants.one.id}`}
                                              alt="league logo"
                                              fit="contain"
                                              h={30}
                                              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                            />
                                            <Text c="red">5</Text>
                                          </Flex>
                                          <Flex
                                            direction="column"
                                            align="center"
                                            bg="black"
                                            p="2"
                                          >
                                            <Text
                                              size={SmallThenSm ? "xs" : "sm"}
                                            >
                                              Stats
                                            </Text>
                                          </Flex>
                                          <Flex
                                            direction="column"
                                            align="center"
                                          >
                                            <Image
                                              src={`/api/team/logo?id=${match.participants.one.id}`}
                                              alt="league logo"
                                              fit="contain"
                                              h={30}
                                              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                            />
                                            <Text c="green">5</Text>
                                          </Flex>
                                        </Flex>
                                      </SimpleGrid>
                                    )}
                                </div>
                              </Card>
                            </>
                          ))
                        )}
                      </SimpleGrid>
                    </>
                  );
                })()}
              </Stack>

              {match.status !== "Scheduled" &&
                ["cs2", "valorant"].includes(match.sportInfo.alias) && (
                  <MatchMapPickBanComp match={match} />
                )}
            </SimpleGrid>
          </Stack>
        </Card>
      </SimpleGrid>
    </>
  );
}
