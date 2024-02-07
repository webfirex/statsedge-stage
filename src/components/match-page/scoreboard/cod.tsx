/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
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
  const rows = props.players.map((element) => {
    const CommonRow = [
      element.kills,
      element.deaths,
      element.kills / element.deaths,
      element.combatStats.damageTaken,
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
    <Text>K</Text>,
    <Text>D</Text>,
    <>
      <Text>K/D</Text>
    </>,
    <Text>Damage</Text>,
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

export function MatchScoreboardCODComp({ match }: MatchScoreboardProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const [SelectedMap, setSelectedMap] = useState(match.maps?.cod?.[0]);

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
              const map = match.maps?.cod?.find(
                (map) => map.mapNumber === Number(value)
              );

              setSelectedMap(map);
            }}
            data={[
              ...(match.maps?.cod ?? []).map((map) => ({
                label: `Match ${map.mapNumber}`,
                value: String(map.mapNumber),
              })),
            ]}
            value={String(SelectedMap?.mapNumber)}
            fullWidth
          />

          {(() => {
            return (
              <>
                <Stack gap="md">
                  {TeamOne ? (
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
                  ) : (
                    <Text ta="center">No Stats For Team One</Text>
                  )}

                  {TeamTwo ? (
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
