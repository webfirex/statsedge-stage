import {
  Badge,
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
  Space,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconTrophyFilled } from "@tabler/icons-react";
import { Children, useMemo, useState } from "react";
import { URLText } from "~/components/url-text";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchScoreboardProps {
  match: MatchType;
}

type PlayerStatsType = Exclude<
  Exclude<MatchType["maps"], undefined>["dota2"],
  undefined
>[0]["teamStats"][0]["players"];

export function ScoreBoardBody(props: { players: PlayerStatsType }) {
  return (
    <>
      <Stack gap={0}>
        {Children.toArray(
          props.players.map((player, index) => {
            const RowData = [
              <>
                {player.kills} / {player.deaths} / {player.assists}
              </>,
              player.cs,
            ];

            return (
              <>
                <Grid
                  columns={12}
                  bg={index % 2 === 0 ? "dark.5" : "transparent"}
                  p="sm"
                >
                  <Grid.Col span={3}>
                    <Group gap="xs">
                      <Image
                        src={`/api/dota/hero?id=${player.heroId}`}
                        alt="champion icon"
                        fit="contain"
                        h={25}
                        fallbackSrc="/place.svg"
                      />

                      <Stack gap={0}>
                        <Text
                          size="sm"
                          tt="capitalize"
                          maw={150}
                          truncate="end"
                        >
                          {player.name}
                        </Text>

                        <Text size="xs" tt="capitalize" c="dimmed">
                          <URLText
                            url={`/api/dota/hero-info?id=${player.heroId}`}
                          />
                        </Text>
                      </Stack>
                    </Group>
                  </Grid.Col>

                  <Grid.Col span={5}>
                    <Group px="xs" gap={0} justify="end">
                      {Children.toArray(
                        (player.items ?? []).map((item) => (
                          <Image
                            src={`/api/dota/item?id=${item}`}
                            alt="item icon"
                            fit="contain"
                            h={25}
                            fallbackSrc="/place.svg"
                          />
                        ))
                      )}
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

  const ColumnsTitle = ["K / D / A", "CS"];

  return (
    <>
      <Grid columns={12} px="xs">
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
                      match.pickBanHero?.one.ban
                        .filter(
                          (hero) => hero.mapNumber === SelectedMap?.mapNumber
                        )
                        .map((data) => (
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
                      match.pickBanHero?.one.pick
                        .filter(
                          (hero) => hero.mapNumber === SelectedMap?.mapNumber
                        )
                        .map((data) => (
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

                  <Space />

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
                      match.pickBanHero?.two.ban
                        .filter(
                          (hero) => hero.mapNumber === SelectedMap?.mapNumber
                        )
                        .map((data) => (
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
                      match.pickBanHero?.two.pick
                        .filter(
                          (hero) => hero.mapNumber === SelectedMap?.mapNumber
                        )
                        .map((data) => (
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
            gap="xl"
          >
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
          </Flex>
        </Card>
      </Stack>
    </>
  );
}
