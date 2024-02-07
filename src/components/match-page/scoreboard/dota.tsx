import {
  Badge,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  SegmentedControl,
  Space,
  Stack,
  Table,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconLetterA,
  IconLetterC,
  IconLetterD,
  IconLetterK,
  IconLetterS,
  IconTrophyFilled,
} from "@tabler/icons-react";
import { Children, useMemo, useState } from "react";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchScoreboardProps {
  match: MatchType;
}

type PlayerStatsType = Exclude<
  Exclude<MatchType["maps"], undefined>["dota2"],
  undefined
>[0]["teamStats"][0]["players"];

export function ScoreBoardLeft(props: {
  teamId: number;
  name: string;
  bg: string;

  players: PlayerStatsType;
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
                  <Table.Td>
                    <Text tt="capitalize" size="sm">
                      {player.name}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              );
            })
          )}
        </Table.Tbody>
      </Table>
    </>
  );
}

export function ScoreBoardRight(props: { players: PlayerStatsType }) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const iconXs = BigThenXs ? 18 : 12;

  const rows = props.players.map((element) => {
    const CommonRow = [
      element.kills,
      element.deaths,
      element.assists,
      element.cs,
    ];

    return (
      <Table.Tr key={element.name}>
        {Children.toArray(
          CommonRow.map((element) => (
            <Table.Td>
              <Text size="sm" ta="center">
                {element}
              </Text>
            </Table.Td>
          ))
        )}
      </Table.Tr>
    );
  });

  const CommonHead = Children.toArray([
    <IconLetterK size={iconXs} />,
    <IconLetterD size={iconXs} />,
    <IconLetterA size={iconXs} />,
    <>
      <IconLetterC size={iconXs} />
      <IconLetterS size={iconXs} />
    </>,
  ]);

  const ths = (
    <Table.Tr>
      {Children.toArray(
        CommonHead.map((element) => (
          <Table.Th h={40}>
            <Text mb="xs" ta="center">
              {element}
            </Text>
          </Table.Th>
        ))
      )}
    </Table.Tr>
  );

  return (
    <Table withRowBorders={false}>
      <Table.Thead>{ths}</Table.Thead>

      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

const Trophy = () => {
  return (
    <>
      <Group gap={5}>
        <IconTrophyFilled
          size={16}
          style={{
            color: "var(--mantine-color-yellow-6)",
          }}
        />

        <Text c="yellow.6" size="xs">
          Win
        </Text>
      </Group>
    </>
  );
};

export function MatchScoreboardDOTA2Comp({ match }: MatchScoreboardProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const [SelectedMap, setSelectedMap] = useState(match.maps?.dota2?.[0]);

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
      <Stack>
        <Grid columns={10} gutter="xs">
          <Grid.Col span={{ base: 10, md: match.pickBanHero ? 7 : 10 }}>
            <Card>
              <Stack>
                <SegmentedControl
                  onChange={(value) => {
                    const map = match.maps?.dota2?.find(
                      (map) => map.mapNumber === Number(value)
                    );

                    setSelectedMap(map);
                  }}
                  data={[
                    ...(match.maps?.dota2 ?? []).map((map) => ({
                      label: `Match ${map.mapNumber}`,
                      value: String(map.mapNumber),
                    })),
                  ]}
                  value={String(SelectedMap?.mapNumber)}
                  fullWidth
                />

                <Space />

                <Flex justify="space-between">
                  <Image
                    src={`/api/team/logo?id=${match.participants.one?.id}`}
                    alt="league logo"
                    fit="contain"
                    h={BigThenXs ? 100 : 40}
                    fallbackSrc="/place.svg"
                  />

                  <Stack gap="xs" miw={160}>
                    <Title tt="uppercase" order={5} c="dimmed" ta="center">
                      Match {match.status}
                    </Title>

                    {SelectedMap?.winnerId && (
                      <Flex
                        justify={
                          SelectedMap?.winnerId === TeamOne?.teamId
                            ? "start"
                            : "end"
                        }
                      >
                        <Trophy />
                      </Flex>
                    )}

                    <Flex justify="space-between">
                      <Title ta="center" miw={45} order={2} c="blue.9">
                        {TeamOne?.kills}
                      </Title>

                      <Stack gap={0} align="center">
                        <Text size="lg">00:00</Text>
                        <Text c="dimmed" size="xs">
                          Duration
                        </Text>
                      </Stack>

                      <Title ta="center" miw={45} order={2} c="red.9">
                        {TeamTwo?.kills}
                      </Title>
                    </Flex>

                    <Flex justify="space-between" align="center">
                      <Text ta="center" miw={37} size="sm" c="dimmed">
                        {TeamOne?.gold}K
                      </Text>

                      <div
                        style={{
                          borderRadius: "50%",
                          width: 15,
                          height: 15,
                          backgroundColor: "var(--mantine-color-yellow-6)",
                        }}
                      />

                      <Text ta="center" miw={37} size="sm" c="dimmed">
                        {TeamTwo?.gold}K
                      </Text>
                    </Flex>
                  </Stack>

                  <Image
                    src={`/api/team/logo?id=${match.participants.two?.id}`}
                    alt="league logo"
                    fit="contain"
                    h={BigThenXs ? 100 : 40}
                    fallbackSrc="/place.svg"
                  />
                </Flex>

                <Stack gap={5}>
                  <Flex justify="space-between">
                    <Text c="blue.9" size="sm" miw={30}>
                      {TeamOne?.towersDestroyed}
                    </Text>

                    <Text>Turrets</Text>

                    <Text c="red.9" size="sm" miw={30}>
                      {TeamTwo?.towersDestroyed}
                    </Text>
                  </Flex>

                  <Divider />
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>

          {match.pickBanHero && (
            <Grid.Col span={{ base: 10, md: 3 }}>
              <Card>
                <Card.Section>
                  <Paper p="xs" bg="dark.5">
                    <Text ta="center" tt="uppercase" fw="bold">
                      Champions
                    </Text>
                  </Paper>
                </Card.Section>

                <Stack mt="md">
                  <Group>
                    <Image
                      src={`/api/team/logo?id=${match.participants.one?.id}`}
                      alt="league logo"
                      fit="contain"
                      h={25}
                      fallbackSrc="/place.svg"
                    />

                    <Text>{match.participants.one?.name ?? "Unknown"}</Text>
                  </Group>

                  <Divider />

                  <Group>
                    <Badge size="lg" radius="xs" color="gray">
                      BAN
                    </Badge>

                    {Children.toArray(
                      match.pickBanHero?.one.ban.map((data) => (
                        <Image
                          src={`/api/dota/hero?id=${data.heroId}`}
                          alt="champion icon"
                          fit="contain"
                          h={25}
                          fallbackSrc="/place.svg"
                        />
                      ))
                    )}
                  </Group>

                  <Group>
                    <Badge size="lg" radius="xs" color="gray">
                      PICK
                    </Badge>

                    {Children.toArray(
                      match.pickBanHero?.one.pick.map((data) => (
                        <Image
                          src={`/api/dota/hero?id=${data.heroId}`}
                          alt="champion icon"
                          fit="contain"
                          h={25}
                          fallbackSrc="/place.svg"
                        />
                      ))
                    )}
                  </Group>

                  <Group>
                    <Image
                      src={`/api/team/logo?id=${match.participants.two?.id}`}
                      alt="league logo"
                      fit="contain"
                      h={25}
                      fallbackSrc="/place.svg"
                    />

                    <Text>{match.participants.two?.name ?? "Unknown"}</Text>
                  </Group>

                  <Divider />

                  <Group>
                    <Badge size="lg" radius="xs" color="gray">
                      BAN
                    </Badge>

                    {Children.toArray(
                      match.pickBanHero?.two.ban.map((data) => (
                        <Image
                          src={`/api/dota/hero?id=${data.heroId}`}
                          alt="champion icon"
                          fit="contain"
                          h={25}
                          fallbackSrc="/place.svg"
                        />
                      ))
                    )}
                  </Group>

                  <Group>
                    <Badge size="lg" radius="xs" color="gray">
                      PICK
                    </Badge>

                    {Children.toArray(
                      match.pickBanHero?.two.pick.map((data) => (
                        <Image
                          src={`/api/dota/hero?id=${data.heroId}`}
                          alt="champion icon"
                          fit="contain"
                          h={25}
                          fallbackSrc="/place.svg"
                        />
                      ))
                    )}
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          )}
        </Grid>

        <Card>
          <Flex
            w="100%"
            direction={{
              base: "column",
              md: "row",
            }}
          >
            <Flex justify="space-between" w="100%">
              <Box
                style={{
                  flexShrink: 1,
                }}
              >
                <ScoreBoardLeft
                  teamId={match.participants.one?.id ?? 0}
                  name={match.participants.one?.name ?? "N/A"}
                  bg="blue.6"
                  players={TeamOne?.players ?? []}
                />
              </Box>

              <Box
                style={{
                  flexShrink: 1,
                }}
              >
                <ScoreBoardRight players={TeamOne?.players ?? []} />
              </Box>
            </Flex>

            <Flex justify="space-between" w="100%">
              <Box
                style={{
                  flexShrink: 1,
                }}
              >
                <ScoreBoardLeft
                  teamId={match.participants.two?.id ?? 0}
                  name={match.participants.two?.name ?? "N/A"}
                  bg="blue.6"
                  players={TeamTwo?.players ?? []}
                />
              </Box>

              <Box
                style={{
                  flexShrink: 1,
                }}
              >
                <ScoreBoardRight players={TeamTwo?.players ?? []} />
              </Box>
            </Flex>
          </Flex>
        </Card>
      </Stack>
    </>
  );
}
