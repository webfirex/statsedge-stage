import {
  Badge,
  Card,
  Center,
  Divider,
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
                          src={`/api/team/logo?id=${match.participants.one.id}`}
                          alt="league logo"
                          fit="contain"
                          h={20}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                        <Text
                          size="xs"
                          fw="bold"
                          visibleFrom="sm"
                          truncate="end"
                          maw={100}
                        >
                          {match.participants.one.team?.name}
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
                          src={`/api/team/logo?id=${match.participants.two.id}`}
                          alt="league logo"
                          fit="contain"
                          h={20}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                        <Text
                          size="xs"
                          fw="bold"
                          visibleFrom="sm"
                          truncate="end"
                          maw={100}
                        >
                          {match.participants.two.team?.name}
                        </Text>
                      </Group>
                    </Card>
                  </Group>
                </Grid.Col>
              </Grid>

              <Divider size="sm" />

              {(() => {
                if (!match.pickBan) {
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
                  match.pickBan.map((map, index) => (
                    <Grid key={index} columns={10}>
                      <Grid.Col span={{ base: 3, sm: 5 }} m="auto" h="100%">
                        <Card
                          h="100%"
                          style={{
                            backgroundImage: SmallThenSm
                              ? "none"
                              : "url(/map.jpg)",
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
                            <Group gap={0}>
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
                              <Stack gap={5}>
                                <Group gap="sm" align="center">
                                  <Title order={SmallThenSm ? 5 : 3}>
                                    100%&nbsp;
                                  </Title>
                                  <Badge color="green" c="white" size="xs">
                                    Pick
                                  </Badge>
                                </Group>
                                <Text size="xs" c="dimmed">
                                  11 maps
                                </Text>
                              </Stack>
                            </Group>

                            <Stack gap={5}>
                              <Title order={SmallThenSm ? 5 : 3}>50%</Title>

                              <Text size="xs" c="dimmed">
                                4 maps
                              </Text>
                            </Stack>
                          </Group>
                        </Card>
                      </Grid.Col>
                    </Grid>
                  ))
                );
              })()}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
