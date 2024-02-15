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
  Exclude<MatchType["maps"], undefined>["cod"],
  undefined
>[0]["teamStats"][0]["players"];

export function ScoreBoardBody(props: { players: PlayerStatsType }) {
  return (
    <>
      <Stack gap={0}>
        {Children.toArray(
          props.players.map((player, index) => {
            const RowData = [
              player.kills,
              player.deaths,
              Math.round((player.kills / player.deaths) * 100) / 100,
              player.combatStats.damageDealt,
            ];

            return (
              <>
                <Grid
                  columns={12}
                  bg={index % 2 === 0 ? "dark.5" : "transparent"}
                  p="sm"
                >
                  <Grid.Col span={8}>
                    <Text size="sm" tt="capitalize">
                      {player.name}
                    </Text>
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

  const ColumnsTitle = ["K", "D", "K/D", "Damage"];

  return (
    <>
      <Grid columns={12} px="sm">
        <Grid.Col span={8}>
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

export function MatchScoreboardCODComp({ match }: MatchScoreboardProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const [SelectedMap, setSelectedMap] = useState(
    match.maps?.cod?.[0]
      ? {
          status: match.maps?.cod?.[0].status,
          teamStats: match.maps?.cod?.[0].teamStats,
          mapNumber: match.maps?.cod?.[0].mapNumber,
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
                  teamStats: match.allMaps.cod,
                });
                return;
              }

              const map = match.maps?.cod?.find(
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
                    ...(match.maps?.cod ?? []).map((map) => ({
                      label: `Match ${map.mapNumber}`,
                      value: String(map.mapNumber),
                    })),
                  ]
                : [
                    ...(match.maps?.cod ?? []).map((map) => ({
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

                        <ScoreBoardBody players={TeamOne?.players ?? []} />
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

                        <ScoreBoardBody players={TeamTwo?.players ?? []} />
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
