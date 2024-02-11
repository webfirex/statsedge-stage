import {
  Box,
  Card,
  Divider,
  Flex,
  Image,
  Paper,
  SegmentedControl,
  Stack,
  Table,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconLetterS } from "@tabler/icons-react";
import {
  IconBomb,
  IconCross,
  IconCurrencyDollar,
  IconLetterA,
  IconLetterD,
  IconLetterF,
  IconLetterH,
  IconLetterK,
  IconLetterR,
  IconShieldFilled,
} from "@tabler/icons-react";
import { Children, useEffect, useState } from "react";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchScoreboardProps {
  match: MatchType;
}

type PlayerStatsType = Exclude<
  Exclude<MatchType["maps"], undefined>["csgo"],
  undefined
>[0]["teamStats"][0]["players"];

export function ScoreBoardLeft(props: {
  teamId: number;
  name: string;
  bg: string;

  players: PlayerStatsType;

  status: MatchType["status"];
}) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Table withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Paper
                py="xs"
                px={BigThenXs ? "md" : "xs"}
                radius="xl"
                bg={props.bg}
              >
                <Flex align="center" gap={BigThenXs ? "xs" : rem(5)}>
                  <Image
                    src={`/api/team/logo?id=${props.teamId}`}
                    alt="league logo"
                    fit="contain"
                    h={BigThenXs ? 20 : 15}
                    fallbackSrc="/place.svg"
                  />
                  <Text size={BigThenXs ? "sm" : rem(10)} c="black">
                    {props.name}
                  </Text>
                </Flex>
              </Paper>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Children.toArray(
            props.players.map((player) => {
              return (
                <Table.Tr>
                  <Table.Td>{player.name}</Table.Td>
                </Table.Tr>
              );
            })
          )}
        </Table.Tbody>
      </Table>
    </>
  );
}

export function ScoreBoardRight(props: {
  players: PlayerStatsType;
  status: MatchType["status"];
}) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const iconXs = BigThenXs ? 18 : 12;

  const rows = props.players.map((element) => {
    const StartedRow = [
      0,
      0,
      0,
      element.kills,
      element.assists,
      element.deaths,
      element.adr,
    ];

    const CommonRow = [
      element.kills,
      element.headshots,
      element.assists ?? 0,
      element.entryKills ?? 0,
      element.deaths,
    ];

    return (
      <Table.Tr key={element.name}>
        {(() => {
          if (props.status === "Started") {
            return Children.toArray(
              StartedRow.map((element) => (
                <Table.Td>
                  <Text ta="center">{element}</Text>
                </Table.Td>
              ))
            );
          }

          return Children.toArray(
            CommonRow.map((element) => (
              <Table.Td>
                <Text size="sm" ta="center">
                  {element}
                </Text>
              </Table.Td>
            ))
          );
        })()}
      </Table.Tr>
    );
  });

  const StartedHead = Children.toArray([
    <IconCurrencyDollar size={iconXs} />,
    <IconCross size={iconXs} />,
    <IconShieldFilled size={iconXs} />,
    <IconLetterK size={iconXs} />,
    <IconLetterA size={iconXs} />,
    <IconLetterD size={iconXs} />,
    <>
      <IconLetterA size={iconXs} />
      <IconLetterD size={iconXs} />
      <IconLetterR size={iconXs} />
    </>,
  ]);

  const CommonHead = Children.toArray([
    <IconLetterK size={iconXs} />,
    <>
      <IconLetterH size={iconXs} />
      <IconLetterS size={iconXs} />
    </>,
    <IconLetterA size={iconXs} />,
    <IconLetterF size={iconXs} />,
    <IconLetterD size={iconXs} />,
  ]);

  const ths = (
    <Table.Tr>
      {(() => {
        if (props.status === "Started") {
          return Children.toArray(
            StartedHead.map((element) => (
              <Table.Th>
                <Text mb="xs" ta="center">
                  {element}
                </Text>
              </Table.Th>
            ))
          );
        }

        return Children.toArray(
          CommonHead.map((element) => (
            <Table.Th h={40}>
              <Text mb="xs" ta="center">
                {element}
              </Text>
            </Table.Th>
          ))
        );
      })()}
    </Table.Tr>
  );

  return (
    <Table withRowBorders={false}>
      <Table.Thead>{ths}</Table.Thead>

      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export function MatchScoreboardCSGOComp({ match }: MatchScoreboardProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const [MapToShow, setMapToShow] = useState(
    match.maps?.csgo?.[match.maps.csgo.length - 1]
  );

  const [SelectedMap, setSelectedMap] = useState(
    match.maps?.csgo?.[0]?.mapName.toLowerCase()
  );

  useEffect(() => {
    if (match.status === "Started") {
      setMapToShow(match.maps?.csgo?.[match.maps.csgo.length - 1]);
    } else {
      const FindMap = match.maps?.csgo?.find(
        (map) => map.mapName.toLowerCase() === SelectedMap
      );

      setMapToShow(FindMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SelectedMap, match.status]);

  return (
    <>
      <Card p="lg">
        <Title order={BigThenXs ? 4 : 5} tt="uppercase" mb={10}>
          ScoreBoard
        </Title>
        <Stack gap="xl">
          {match.status === "Started" ? (
            <Flex align="center" justify="space-between">
              <Stack>
                <Flex align="center" gap="xs">
                  <Text c="dimmed" size={BigThenXs ? "sm" : "xs"}>
                    R - 21
                  </Text>
                  <Divider orientation="vertical" size="sm" />
                  <Text size={BigThenXs ? "sm" : "xs"} tt="capitalize">
                    {MapToShow?.mapName.replace("de_", "")}
                  </Text>
                </Flex>
              </Stack>

              <Flex align="center" gap={rem(5)}>
                <Title order={BigThenXs ? 4 : 5}>
                  {MapToShow?.roundScores[0]?.roundsWon ?? 0}
                </Title>
                <Title order={BigThenXs ? 4 : 5}>:</Title>
                <Title order={BigThenXs ? 4 : 5}>
                  {MapToShow?.roundScores[1]?.roundsWon ?? 0}
                </Title>
              </Flex>

              <Flex align="center" gap={rem(5)}>
                <Text size={BigThenXs ? "sm" : "xs"}>1:39</Text>
                <IconBomb size={BigThenXs ? 20 : 16} />
              </Flex>
            </Flex>
          ) : (
            <SegmentedControl
              onChange={(value) => setSelectedMap(value)}
              data={[
                // { label: "All Maps", value: "all" },
                ...(match.maps?.csgo ?? []).map((map) => ({
                  label: map.mapName
                    .replace("de_", "")
                    .replace(/^[a-z]/, (L) => L.toUpperCase()),
                  value: map.mapName.toLowerCase(),
                })),
              ]}
              value={SelectedMap}
              fullWidth
            />
          )}

          {(() => {
            return (
              <>
                <Stack gap="md">
                  <Flex justify="space-between">
                    <Box
                      style={{
                        flexShrink: 1,
                      }}
                    >
                      <ScoreBoardLeft
                        teamId={match.participants.one?.id ?? 0}
                        name={match.participants.one?.name ?? "N/A"}
                        bg="yellow.6"
                        players={MapToShow?.teamStats[0]?.players ?? []}
                        status={match.status}
                      />
                    </Box>

                    <Box
                      style={{
                        flexShrink: 1,
                      }}
                    >
                      <ScoreBoardRight
                        players={MapToShow?.teamStats[0]?.players ?? []}
                        status={match.status}
                      />
                    </Box>
                  </Flex>

                  <Flex justify="space-between">
                    <Box
                      style={{
                        flexShrink: 1,
                      }}
                    >
                      <ScoreBoardLeft
                        teamId={match.participants.two?.id ?? 0}
                        name={match.participants.two?.name ?? "N/A"}
                        bg="blue.6"
                        players={MapToShow?.teamStats[1]?.players ?? []}
                        status={match.status}
                      />
                    </Box>

                    <Box
                      style={{
                        flexShrink: 1,
                      }}
                    >
                      <ScoreBoardRight
                        players={MapToShow?.teamStats[1]?.players ?? []}
                        status={match.status}
                      />
                    </Box>
                  </Flex>
                </Stack>
              </>
            );
          })()}
        </Stack>
      </Card>
    </>
  );
}
