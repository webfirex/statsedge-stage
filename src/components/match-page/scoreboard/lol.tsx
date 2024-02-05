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
  Stack,
  Table,
  Text,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconLetterA,
  IconLetterC,
  IconLetterD,
  IconLetterK,
  IconLetterS,
} from "@tabler/icons-react";
import { Children, useState } from "react";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchScoreboardProps {
  match: MatchType;
}

type PlayerStatsType = Exclude<
  Exclude<MatchType["maps"], undefined>["lol"],
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

export function MatchScoreboardLOLComp({ match }: MatchScoreboardProps) {
  const [SelectedMap, setSelectedMap] = useState(match.maps?.lol?.[0]);

  return (
    <>
      <Stack>
        <Grid columns={10} gutter="xs">
          <Grid.Col span={{ base: 10, md: match.pickBanHero ? 7 : 10 }}>
            <Card>
              <SegmentedControl
                onChange={(value) => {
                  const map = match.maps?.lol?.find(
                    (map) => map.mapNumber === Number(value)
                  );

                  setSelectedMap(map);
                }}
                data={[
                  ...(match.maps?.lol ?? []).map((map) => ({
                    label: `Match ${map.mapNumber}`,
                    value: String(map.mapNumber),
                  })),
                ]}
                value={String(SelectedMap?.mapNumber)}
                fullWidth
              />
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
                      match.pickBanHero?.one.ban.map(() => (
                        <Image
                          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/riki.png?"
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
                      match.pickBanHero?.one.pick.map(() => (
                        <Image
                          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/riki.png?"
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
                      match.pickBanHero?.two.ban.map(() => (
                        <Image
                          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/riki.png?"
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
                      match.pickBanHero?.two.pick.map(() => (
                        <Image
                          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/riki.png?"
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
          <Group grow>
            <Flex justify="space-between">
              <Box
                style={{
                  flexShrink: 1,
                }}
              >
                <ScoreBoardLeft
                  teamId={match.participants.one?.id ?? 0}
                  name={match.participants.one?.name ?? "N/A"}
                  bg="blue.6"
                  players={SelectedMap?.teamStats[0]?.players ?? []}
                />
              </Box>

              <Box
                style={{
                  flexShrink: 1,
                }}
              >
                <ScoreBoardRight
                  players={SelectedMap?.teamStats[0]?.players ?? []}
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
                  players={SelectedMap?.teamStats[1]?.players ?? []}
                />
              </Box>

              <Box
                style={{
                  flexShrink: 1,
                }}
              >
                <ScoreBoardRight
                  players={SelectedMap?.teamStats[1]?.players ?? []}
                />
              </Box>
            </Flex>
          </Group>
        </Card>
      </Stack>
    </>
  );
}
