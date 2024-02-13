import {
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBomb,
  IconCross,
  IconCurrencyDollar,
  IconShieldFilled,
} from "@tabler/icons-react";
import { Children, type ReactNode, useState, useMemo } from "react";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchScoreboardProps {
  match: MatchType;
}

type PlayerStatsType = Exclude<
  Exclude<MatchType["maps"], undefined>["csgo"],
  undefined
>[0]["teamStats"][0]["players"];

export function HeadTextCell(props: { children: string }) {
  return (
    <Center h="100%">
      <Text ta="center" my="auto" size="sm">
        {props.children}
      </Text>
    </Center>
  );
}

export function BodyTextCell(props: {
  children: ReactNode;
  align: "left" | "center";
}) {
  return (
    <Text ta={props.align} my="auto" size="sm" tt="capitalize">
      {props.children}
    </Text>
  );
}

export function ScoreBoardBody(props: {
  players: PlayerStatsType;
  status: MatchType["status"];
}) {
  return (
    <>
      <Stack gap={0}>
        {Children.toArray(
          props.players.map((player, index) => {
            const LiveRow = [
              0,
              0,
              0,
              player.kills,
              player.assists,
              player.deaths,
              player.adr,
            ];

            const PastRow = [
              player.kills,
              player.headshots,
              player.assists ?? 0,
              player.entryKills ?? 0,
              player.deaths,
            ];

            return (
              <>
                <Grid
                  columns={10}
                  bg={index % 2 === 0 ? "dark.5" : "transparent"}
                  p="xs"
                >
                  <Grid.Col span={7}>
                    <BodyTextCell align="left">{player.name}</BodyTextCell>
                  </Grid.Col>

                  {Children.toArray(
                    (props.status === "Started" ? LiveRow : PastRow).map(
                      (element) => (
                        <Grid.Col span="auto">
                          <BodyTextCell align="center">{element}</BodyTextCell>
                        </Grid.Col>
                      )
                    )
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
  status: MatchType["status"];
  teamId: number;
  name: string;
  color: string;
}) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const iconXs = BigThenXs ? 18 : 12;

  const LiveHeader = [
    <>
      <IconCurrencyDollar size={iconXs} />
    </>,
    <>
      <IconCross size={iconXs} />
    </>,
    <>
      <IconShieldFilled size={iconXs} />
    </>,
    <>
      <HeadTextCell>K</HeadTextCell>
    </>,
    <>
      <HeadTextCell>A</HeadTextCell>
    </>,
    <>
      <HeadTextCell>D</HeadTextCell>
    </>,
    <>
      <HeadTextCell>ADR</HeadTextCell>
    </>,
  ];

  const PastHeader = [
    <>
      <HeadTextCell>K</HeadTextCell>
    </>,
    <>
      <HeadTextCell>HS</HeadTextCell>
    </>,
    <>
      <HeadTextCell>A</HeadTextCell>
    </>,
    <>
      <HeadTextCell>Entry</HeadTextCell>
    </>,
    <>
      <HeadTextCell>D</HeadTextCell>
    </>,
  ];

  return (
    <>
      <Grid columns={10}>
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
          (props.status === "Started" ? LiveHeader : PastHeader).map(
            (element) => <Grid.Col span="auto">{element}</Grid.Col>
          )
        )}
      </Grid>
    </>
  );
}

export function MatchScoreboardCSGOComp({ match }: MatchScoreboardProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const [SelectedMap, setSelectedMap] = useState(match.maps?.csgo?.[0]);

  const [TeamOne, TeamTwo] = useMemo(() => {
    const _teamone = SelectedMap?.teamStats.find(
      (team) => team.teamId === match.participants.one?.id
    );

    const _teamtwo = SelectedMap?.teamStats.find(
      (team) => team.teamId === match.participants.two?.id
    );

    console.log({
      _teamone,
      _teamtwo,
    });

    return [_teamone, _teamtwo];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SelectedMap]);

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
                    {SelectedMap?.mapName.replace("de_", "")}
                  </Text>
                </Flex>
              </Stack>

              <Flex align="center" gap={rem(5)}>
                <Title order={BigThenXs ? 4 : 5}>
                  {SelectedMap?.roundScores[0]?.roundsWon ?? 0}
                </Title>
                <Title order={BigThenXs ? 4 : 5}>:</Title>
                <Title order={BigThenXs ? 4 : 5}>
                  {SelectedMap?.roundScores[1]?.roundsWon ?? 0}
                </Title>
              </Flex>

              <Flex align="center" gap={rem(5)}>
                <Text size={BigThenXs ? "sm" : "xs"}>1:39</Text>
                <IconBomb size={BigThenXs ? 20 : 16} />
              </Flex>
            </Flex>
          ) : (
            <SegmentedControl
              onChange={(value) => {
                const map = match.maps?.csgo?.find(
                  (map) => map.mapNumber === Number(value)
                );

                setSelectedMap(map);
              }}
              data={[
                // { label: "All Maps", value: "all" },
                ...(match.maps?.csgo ?? []).map((map) => ({
                  label: map.mapName
                    .replace("de_", "")
                    .replace(/^[a-z]/, (L) => L.toUpperCase()),
                  value: map.mapNumber.toString(),
                })),
              ]}
              value={String(SelectedMap?.mapNumber)}
              fullWidth
            />
          )}

          {(() => {
            return (
              <>
                <Stack gap="md">
                  <ScoreBoardHead
                    status={match.status}
                    teamId={match.participants.one?.id ?? 0}
                    name={match.participants.one?.name ?? "N/A"}
                    color="yellow.6"
                  />

                  <ScoreBoardBody
                    players={TeamOne?.players ?? []}
                    status={match.status}
                  />

                  <ScoreBoardHead
                    status={match.status}
                    teamId={match.participants.two?.id ?? 0}
                    name={match.participants.two?.name ?? "N/A"}
                    color="blue.6"
                  />

                  <ScoreBoardBody
                    players={TeamTwo?.players ?? []}
                    status={match.status}
                  />
                </Stack>
              </>
            );
          })()}
        </Stack>
      </Card>
    </>
  );
}
