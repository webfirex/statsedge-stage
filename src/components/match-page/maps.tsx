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
import { MapImages } from "~/lib/functions";

interface MatchMapsProps {
  match: MatchType;
}

export function MatchMapCSGOComp({ match }: MatchMapsProps) {
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  if (!match?.maps?.csgo) {
    return (
      <Center>
        <Text>No CSGO maps found</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid
      cols={{
        base: match.sport.alias === "codmwiii" ? 3 : 1,
        md: match.sport.alias === "codmwiii" ? 4 : 1,
      }}
    >
      {Children.toArray(
        match.maps.csgo.map((map) => (
          <>
            <Card
              style={{
                backgroundImage: `url(${MapImages(map.mapName)})`,
                backgroundSize: "cover",
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
                    <Title order={3} ta="center" tt="capitalize">
                      {map.mapName.replace("de_", "")}
                    </Title>
                  </Flex>
                )}

                {match?.status !== "Scheduled" &&
                  ["cs2", "valorant"].includes(match.sport.alias) && (
                    <Flex align="center" justify="space-between">
                      <Title order={3} tt="capitalize">
                        {map.mapName.replace("de_", "")}
                      </Title>
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
                            src={`/api/team/logo?id=${map.roundScores[0]?.id}`}
                            alt="league logo"
                            fit="contain"
                            h={30}
                            fallbackSrc="/place.svg"
                          />
                          <Text
                            c={
                              (map.roundScores[0]?.roundsWon ?? 0) >
                              (map.roundScores[1]?.roundsWon ?? 0)
                                ? "green"
                                : "red"
                            }
                          >
                            {map.roundScores[0]?.roundsWon ?? 0}
                          </Text>
                        </Flex>
                        <Flex
                          direction="column"
                          align="center"
                          bg="black"
                          p="sm"
                        >
                          <Text size="sm">Stats</Text>
                          <Text>s</Text>
                        </Flex>
                        <Flex direction="column" align="center">
                          <Image
                            src={`/api/team/logo?id=${map.roundScores[1]?.id}`}
                            alt="league logo"
                            fit="contain"
                            h={30}
                            fallbackSrc="/place.svg"
                          />
                          <Text
                            c={
                              (map.roundScores[1]?.roundsWon ?? 0) >
                              (map.roundScores[0]?.roundsWon ?? 0)
                                ? "green"
                                : "red"
                            }
                          >
                            {map.roundScores[1]?.roundsWon ?? 0}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  )}
              </div>
            </Card>
          </>
        ))
      )}
    </SimpleGrid>
  );
}

export function MatchMapCODComp({ match }: MatchMapsProps) {
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  if (!match?.maps?.cod) {
    return (
      <Center>
        <Text>No COD maps found</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid
      cols={{
        base: match.sport.alias === "codmwiii" ? 3 : 1,
        md: match.sport.alias === "codmwiii" ? 5 : 1,
      }}
    >
      {Children.toArray(
        match.maps.cod.map((map) => (
          <>
            <Card
              style={{
                backgroundImage: `url(${MapImages(map.mapName)})`,
                backgroundSize: "cover",
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

                {match.status !== "Scheduled" && (
                  <SimpleGrid cols={{ base: 1, md: 1 }}>
                    <Title ta="center" order={5}>
                      {map.mapName}
                    </Title>
                    <Divider />
                    <Text size="sm" ta="center">
                      {map.mode}
                    </Text>
                    <Flex justify="space-between" align="center" gap="xs">
                      <Flex direction="column" align="center" justify="center">
                        <Image
                          src={`/api/team/logo?id=${map.mapScores[0]?.teamId}`}
                          alt="league logo"
                          fit="contain"
                          h={30}
                          fallbackSrc="/place.svg"
                        />
                        <Text
                          c={
                            (map.mapScores[0]?.score ?? 0) >
                            (map.mapScores[1]?.score ?? 0)
                              ? "green"
                              : "red"
                          }
                        >
                          {map.mapScores[0]?.score ?? 0}
                        </Text>
                      </Flex>
                      <Flex direction="column" align="center" bg="black" p="2">
                        <Text size={SmallThenSm ? "xs" : "sm"}>Stats</Text>
                      </Flex>
                      <Flex direction="column" align="center">
                        <Image
                          src={`/api/team/logo?id=${map.mapScores[1]?.teamId}`}
                          alt="league logo"
                          fit="contain"
                          h={30}
                          fallbackSrc="/place.svg"
                        />
                        <Text
                          c={
                            (map.mapScores[1]?.score ?? 0) >
                            (map.mapScores[0]?.score ?? 0)
                              ? "green"
                              : "red"
                          }
                        >
                          {map.mapScores[1]?.score ?? 0}
                        </Text>
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
  );
}

export function MatchMapsComp({ match }: MatchMapsProps) {
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
                    : match.sport.alias === "codmwiii"
                    ? 1
                    : 2,
              }}
              spacing="xl"
            >
              <Stack>
                <Divider />

                {(() => {
                  if (match.sport.alias === "codmwiii") {
                    return (
                      <>
                        <MatchMapCODComp match={match} />
                      </>
                    );
                  }

                  if (["cs2", "valorant"].includes(match.sport.alias)) {
                    return (
                      <>
                        <MatchMapCSGOComp match={match} />
                      </>
                    );
                  }

                  return <>Sport not supported</>;
                })()}
              </Stack>

              {match.status !== "Scheduled" &&
                ["cs2", "valorant"].includes(match.sport.alias) && (
                  <MatchMapPickBanComp match={match} />
                )}
            </SimpleGrid>
          </Stack>
        </Card>
      </SimpleGrid>
    </>
  );
}
