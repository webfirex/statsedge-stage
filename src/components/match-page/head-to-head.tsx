import {
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import moment from "moment";
import { Children } from "react";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchStreamProps {
  match: MatchType;
}

export function MatchHeadToHeadComp({ match }: MatchStreamProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  return (
    <>
      <Card p="lg">
        <Stack>
          <Title tt="uppercase" fz={BigThenXs ? 28 : 18} order={5}>
            Head to Head
          </Title>

          <Space />

          <Card bg="dark.5">
            <Flex justify="space-evenly" align="center" wrap="nowrap">
              <Flex align="center" gap={BigThenXs ? "md" : rem(5)}>
                <Image
                  src={`/api/team/logo?id=${match.participants.one?.id}`}
                  alt="league logo"
                  fit="contain"
                  h={BigThenXs ? 50 : 15}
                  fallbackSrc="/place.svg"
                />

                <Text size={BigThenXs ? "md" : rem(8)}>
                  {match.participants.one?.name ?? "Unknown"}
                </Text>
              </Flex>

              <Stack gap={0}>
                <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                  {match.opponentMatches?.fixtures?.reduce(
                    (totalScore, fixture) => totalScore + fixture.score,
                    0
                  )}
                </Text>
                <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                  Wins
                </Text>
              </Stack>

              <Stack gap={0}>
                <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                  {match.opponentMatches?.fixtures?.reduce(
                    (totalScore, fixture) =>
                      totalScore + fixture.score + fixture.opponentScore,
                    0
                  )}
                </Text>
                <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                  Overview
                </Text>
              </Stack>

              <Stack gap={0}>
                <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                  {match.opponentMatches?.fixtures?.reduce(
                    (totalScore, fixture) => totalScore + fixture.opponentScore,
                    0
                  )}
                </Text>
                <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                  Wins
                </Text>
              </Stack>

              <Flex align="center" gap={BigThenXs ? "md" : rem(5)}>
                <Text size={BigThenXs ? "md" : rem(8)}>
                  {match.participants.two?.name ?? "Unknown"}
                </Text>

                <Image
                  src={`/api/team/logo?id=${match.participants.two?.id}`}
                  alt="league logo"
                  fit="contain"
                  h={BigThenXs ? 50 : 15}
                  fallbackSrc="/place.svg"
                />
              </Flex>
            </Flex>
          </Card>

          <Stack gap={0}>
            {match.opponentMatches?.fixtures?.length != null &&
              match.opponentMatches.fixtures.length > 0 &&
              Children.toArray(
                match.opponentMatches.fixtures.map((data, dindex) => (
                  <>
                    <Paper
                      bg={dindex % 2 === 0 ? "transparent" : "dark.5"}
                      key={dindex}
                      radius="sm"
                      px={BigThenXs ? "xl" : "xs"}
                      py="xs"
                    >
                      <Flex justify="space-between" align="center">
                        <Group>
                          <Text size={BigThenXs ? "sm" : rem(10)}>
                            {moment(data.fixtureTime).format("DD/MM/YYYY")}
                          </Text>

                          <Divider orientation="vertical" size="sm" />

                          <Image
                            src={`/api/team/logo?id=${match.participants.one?.id}`}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 10}
                            fallbackSrc="/place.svg"
                          />

                          {BigThenXs && (
                            <Text size="sm">{match.participants.one?.name}</Text>
                          )}

                          <Image
                            src={`/api/team/logo?id=${match.participants.two?.id}`}
                            alt="league logo"
                            fit="contain"
                            h={20}
                            fallbackSrc="/place.svg"
                          />

                          {BigThenXs && (
                            <Text size="sm">
                              {match.participants.two?.name ?? "Unknown"}
                            </Text>
                          )}

                          <Divider
                            orientation="vertical"
                            size="sm"
                            color="blue"
                          />

                          <Text
                            size={BigThenXs ? "sm" : rem(10)}
                            visibleFrom="sm"
                          >
                            {data.detail.competition.name ?? "Unknown"}
                          </Text>
                        </Group>

                        <Group gap={SmallThenSm ? rem(7) : "md"}>
                          {match.sport?.alias !== "lol" && (
                            <>
                              <Text
                                size={BigThenXs ? "sm" : rem(8)}
                                hiddenFrom="sm"
                              >
                                {"Unknown"}
                              </Text>
                              <Text
                                size={BigThenXs ? "sm" : rem(8)}
                                tt="uppercase"
                                c="dimmed"
                              >
                                {"Unknown"}
                              </Text>

                              <Divider orientation="vertical" size="sm" />
                            </>
                          )}

                          <Text size={BigThenXs ? "sm" : rem(10)}>
                            <Text inherit span c="red">
                              {data.score ?? "NA"}
                            </Text>{" "}
                            -{" "}
                            <Text inherit span c="green">
                              {data.opponentScore ?? "NA"}
                            </Text>
                          </Text>
                        </Group>
                      </Flex>
                    </Paper>
                  </>
                ))
              )}
            {!match.opponentMatches?.fixtures?.length && (
              <Text ta="center">No data available</Text>
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
