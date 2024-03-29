import {
  Badge,
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Overlay,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Children } from "react";
import { MapImages } from "~/lib/functions";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchMapStatusProps {
  match: MatchType;
}

export function MatchMapStatusComp({ match }: MatchMapStatusProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  return (
    <>
      <Grid columns={10}>
        <Grid.Col span={BigThenXs ? 7 : 10}>
          <Card p={BigThenXs ? "lg" : "xs"} bg="transparent">
            <Stack>
              <Grid columns={10}>
                <Grid.Col p={BigThenXs ? 20 : 20} span={5}>
                  <Title order={5} tt="uppercase">
                    Maps Status
                  </Title>
                </Grid.Col>

                <Grid.Col span={5}>
                  <Group justify="space-between">
                    <Card
                      withBorder
                      p="xs"
                      radius="xl"
                      py={BigThenXs ? 5 : 2}
                      bg="transparent"
                      style={{
                        borderColor: "var(--mantine-color-red-4)",
                      }}
                    >
                      <Group gap="xs">
                        <Image
                          src={`/api/team/logo?id=${match.participants.one?.id}`}
                          alt="league logo"
                          fit="contain"
                          h={20}
                          fallbackSrc="/place.svg"
                        />
                        <Text
                          size="xs"
                          fw="bold"
                          visibleFrom="sm"
                          truncate="end"
                          maw={100}
                        >
                          {match.participants.one?.team?.name}
                        </Text>
                      </Group>
                    </Card>

                    <Card
                      withBorder
                      p="xs"
                      radius="xl"
                      py={BigThenXs ? 5 : 2}
                      bg="transparent"
                      style={{
                        borderColor: "var(--mantine-color-green-4)",
                      }}
                    >
                      <Group gap="xs">
                        <Image
                          src={`/api/team/logo?id=${match.participants.two?.id}`}
                          alt="league logo"
                          fit="contain"
                          h={20}
                          fallbackSrc="/place.svg"
                        />
                        <Text
                          size="xs"
                          fw="bold"
                          visibleFrom="sm"
                          truncate="end"
                          maw={100}
                        >
                          {match.participants.two?.team?.name}
                        </Text>
                      </Group>
                    </Card>
                  </Group>
                </Grid.Col>
              </Grid>

              <Divider size="sm" />

              {(() => {
                if (!match.pickBanMap) {
                  return (
                    <>
                      <Center>
                        <Text size="xl" c="dimmed">
                          No data
                        </Text>
                      </Center>
                    </>
                  );
                }

                return Children.toArray(
                  match.pickBanMap
                    .sort((a, b) => a.order - b.order)
                    .map((map, index) => {
                      const mapOneStats = match.mapStats?.one?.maps.find(
                        (m) => m.mapName === `de_${map.mapName.toLowerCase()}`
                      );

                      const mapTwoStats = match.mapStats?.two?.maps.find(
                        (m) => m.mapName === `de_${map.mapName.toLowerCase()}`
                      );

                      return (
                        <Grid key={index} columns={10}>
                          <Grid.Col span={{ base: 3, sm: 5 }} m="auto" h="100%">
                            <Card
                              h="100%"
                              style={{
                                backgroundImage: SmallThenSm
                                  ? "none"
                                  : `url(${MapImages(
                                      `de_${map.mapName.toLowerCase()}`
                                    )})`,

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
                                <Title order={SmallThenSm ? 5 : 1} ta="center">
                                  {map.mapName}
                                </Title>
                              </div>
                            </Card>
                          </Grid.Col>

                          <Grid.Col span={{ base: 7, sm: 5 }} m="auto">
                            <Card>
                              <Group justify="space-between">
                                <Flex align="center">
                                  {(map.teamId ?? 0) ===
                                    match.participants.one?.id &&
                                    (map.pickOrBan === "pick" ? (
                                      <Badge
                                        size="xs"
                                        visibleFrom="sm"
                                        color="green"
                                        style={{
                                          transform: "rotate(90deg)",
                                        }}
                                      >
                                        Pick
                                      </Badge>
                                    ) : (
                                      map.pickOrBan === "ban" && (
                                        <Badge
                                          size="xs"
                                          visibleFrom="sm"
                                          color="gray"
                                          style={{
                                            transform: "rotate(90deg)",
                                          }}
                                        >
                                          Ban
                                        </Badge>
                                      )
                                    ))}
                                  <Stack gap={5}>
                                    <Title order={SmallThenSm ? 5 : 3}>
                                      {mapOneStats
                                        ? Math.round(
                                            ((mapOneStats?.won ?? 0) /
                                              (mapOneStats?.played ?? 0)) *
                                              100
                                          )
                                        : 0}
                                      %
                                    </Title>

                                    <Text size="xs" c="dimmed">
                                      {mapOneStats?.played ?? 0} maps
                                    </Text>
                                  </Stack>
                                </Flex>

                                <Flex align="center">
                                  {(map.teamId ?? 0) ===
                                    match.participants.two?.id &&
                                    (map.pickOrBan === "pick" ? (
                                      <Badge
                                        size="xs"
                                        visibleFrom="sm"
                                        color="green"
                                        style={{
                                          transform: "rotate(90deg)",
                                        }}
                                      >
                                        Pick
                                      </Badge>
                                    ) : (
                                      map.pickOrBan === "ban" && (
                                        <Badge
                                          size="xs"
                                          visibleFrom="sm"
                                          color="gray"
                                          style={{
                                            transform: "rotate(90deg)",
                                          }}
                                        >
                                          Ban
                                        </Badge>
                                      )
                                    ))}
                                  <Stack gap={5}>
                                    <Title order={SmallThenSm ? 5 : 3}>
                                      {mapTwoStats
                                        ? Math.round(
                                            ((mapTwoStats?.won ?? 0) /
                                              (mapTwoStats?.played ?? 0)) *
                                              100
                                          )
                                        : 0}
                                      %
                                    </Title>

                                    <Text size="xs" c="dimmed">
                                      {mapTwoStats?.played ?? 0} maps
                                    </Text>
                                  </Stack>
                                </Flex>
                              </Group>
                            </Card>
                          </Grid.Col>
                        </Grid>
                      );
                    })
                );
              })()}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
