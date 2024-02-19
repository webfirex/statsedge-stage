/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Children, useMemo, useState } from "react";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchScoreboardProps {
  match: MatchType;
}

type PlayerStatsType = Exclude<
  Exclude<MatchType["maps"], undefined>["valo"],
  undefined
>[0]["teamStats"][0]["players"];

export function ScoreBoardBody(props: {
  players: PlayerStatsType;
  selectedMapNumber: number;
}) {
  return (
    <>
      <Stack gap={0}>
        {Children.toArray(
          props.players.map((player, index) => {
            const RowData = [
              player.totalStats.kills,
              player.totalStats.deaths,
              player.totalStats.assists,
              <>{player.totalStats.headshotPercentage}%</>,
              player.totalStats.firstKills,
              player.totalStats.firstDeaths,
            ];

            return (
              <>
                <Grid
                  columns={12}
                  bg={index % 2 === 0 ? "dark.5" : "transparent"}
                  p="sm"
                >
                  <Grid.Col span={7}>
                    <Group>
                      {props.selectedMapNumber !== 69 &&
                        Children.toArray(
                          player.agents.map((agent) => (
                            <Image
                              src={`/valo/${agent}.png`}
                              alt="agent icon"
                              fit="contain"
                              h={20}
                              fallbackSrc="/place.svg"
                            />
                          ))
                        )}

                      <Text size="sm" tt="capitalize">
                        {player.name}
                      </Text>
                    </Group>
                  </Grid.Col>

                  {Children.toArray(
                    RowData.map((element) => (
                      <Grid.Col span="auto">
                        <Text size="sm" ta="center">
                          {element}
                        </Text>
                      </Grid.Col>
                    ))
                  )}
                </Grid>

                <Divider />
              </>
            );
          })
        )}
      </Stack>
    </>
  );
}

export function ScoreBoardHead(props: {
  teamId: number;
  name: string;
  color: string;
}) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const ColumnsTitle = ["K", "D", "A", "HS%", "FK", "FD"];

  return (
    <>
      <Grid columns={12} px="sm">
        <Grid.Col span={7}>
          <Group>
            <Paper
              py="xs"
              px={BigThenXs ? "md" : "xs"}
              radius="xl"
              bg={props.color}
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
          </Group>
        </Grid.Col>

        {Children.toArray(
          ColumnsTitle.map((element) => (
            <Grid.Col span="auto">
              <Center h="100%">
                <Text ta="center" my="auto" size="sm">
                  {element}
                </Text>
              </Center>
            </Grid.Col>
          ))
        )}
      </Grid>
    </>
  );
}

export function MatchScoreboardVALOComp({ match }: MatchScoreboardProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const [SelectedMap, setSelectedMap] = useState(
    match.maps?.valo?.[0]
      ? {
          status: match.maps?.valo?.[0].status,
          teamStats: match.maps?.valo?.[0].teamStats,
          mapNumber: match.maps?.valo?.[0].mapNumber,
        }
      : null
  );

  const [TeamOne, TeamTwo] = useMemo(() => {
    const _teamone = SelectedMap?.teamStats.find(
      (team) => team.teamId === match.participants.one?.id
    );

    const _teamtwo = SelectedMap?.teamStats.find(
      (team) => team.teamId === match.participants.two?.id
    );

    return [_teamone, _teamtwo];
  }, [SelectedMap]);

  return (
    <>
      <Card p="lg">
        <Title order={BigThenXs ? 4 : 5} tt="uppercase" mb={10}>
          ScoreBoard
        </Title>
        <Stack gap="xl">
          <SegmentedControl
            onChange={(value) => {
              if (value === "69") {
                setSelectedMap({
                  status: "ended",
                  mapNumber: 69,
                  teamStats: match.allMaps.valorant,
                });
                return;
              }

              const map = match.maps?.valo?.find(
                (map) => map.mapNumber === Number(value)
              );

              if (!map) {
                return;
              }

              setSelectedMap({
                status: map?.status,
                teamStats: map?.teamStats,
                mapNumber: map?.mapNumber,
              });
            }}
            data={
              match.format.value > 1
                ? [
                    { label: "All Maps", value: "69" },
                    ...(match.maps?.valo ?? []).map((map) => ({
                      label: `Match ${map.mapNumber}`,
                      value: String(map.mapNumber),
                    })),
                  ]
                : [
                    ...(match.maps?.valo ?? []).map((map) => ({
                      label: `Match ${map.mapNumber}`,
                      value: String(map.mapNumber),
                    })),
                  ]
            }
            value={String(SelectedMap?.mapNumber)}
            fullWidth
          />

          {(() => {
            return (
              <>
                <Stack gap="md">
                  {TeamOne ? (
                    <ScrollArea type="never" w={BigThenXs ? "100%" : 400}>
                      <Stack gap="md" w={BigThenXs ? "100%" : 650}>
                        <ScoreBoardHead
                          teamId={match.participants.one?.id ?? 0}
                          name={match.participants.one?.name ?? "N/A"}
                          color="yellow.6"
                        />

                        <ScoreBoardBody
                          players={TeamOne?.players}
                          selectedMapNumber={SelectedMap?.mapNumber ?? 0}
                        />
                      </Stack>
                    </ScrollArea>
                  ) : (
                    <Text ta="center">No Stats For Team One</Text>
                  )}

                  {TeamTwo ? (
                    <ScrollArea type="never" w={BigThenXs ? "100%" : 400}>
                      <Stack gap="md" w={BigThenXs ? "100%" : 650}>
                        <ScoreBoardHead
                          teamId={match.participants.two?.id ?? 0}
                          name={match.participants.two?.name ?? "N/A"}
                          color="blue.6"
                        />

                        <ScoreBoardBody
                          players={TeamTwo?.players}
                          selectedMapNumber={SelectedMap?.mapNumber ?? 0}
                        />
                      </Stack>
                    </ScrollArea>
                  ) : (
                    <>
                      <Text ta="center">No Stats For Team Two</Text>
                    </>
                  )}
                </Stack>
              </>
            );
          })()}
        </Stack>
      </Card>
    </>
  );
}
