import {
  Image,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Space,
  Stack,
  Text,
  Title,
  rem,
  Paper,
  Group,
  Divider,
} from "@mantine/core";
import { FadeUpAni } from "~/components/animation/fade-up";
import { LayoutComp } from "~/components/layout";
import { PathDisplay } from "~/components/pathdisplay";
import { NumTimeFormat, SportInfo } from "~/lib/functions";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { AdBanner } from "~/components/player-page/ad-banner";
import { TeamDetails } from "~/components/team-page/team-details";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { z } from "zod";
import { SportApi } from "~/lib/sport-api";
import { Children } from "react";
import { TeamPlayerCard } from "~/components/team-page/player-card";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const parsedId = z
    .string()
    .regex(/^[0-9]+$/)
    .transform((val) => parseInt(val))
    .safeParse(id);

  if (!parsedId.success) {
    return { notFound: true };
  }

  const TeamInfoPromise = SportApi.Team.Get.Call({
    id: parsedId.data,
  });

  const TeamFormPromise = SportApi.Team.Form.Call({
    id: parsedId.data,
  });

  const [TeamInfo, TeamForm] = await Promise.all([
    TeamInfoPromise,
    TeamFormPromise,
  ]);

  if (!TeamInfo) {
    return { notFound: true };
  }

  const TeamPlayers = TeamInfo.most_recent_lineup
    ? await Promise.all(
        TeamInfo.most_recent_lineup.map(async (player) => {
          const PlayerInfoPromise = SportApi.Player.Get.Call({
            id: player.id,
          });

          const PlayerStatsPromise = SportApi.Player.Stats.Call({
            id: player.id,
          });

          const [PlayerInfo, PlayerStats] = await Promise.all([
            PlayerInfoPromise,
            PlayerStatsPromise,
          ]);

          if (!PlayerInfo) {
            return null;
          }

          return {
            ...PlayerInfo,
            stats: PlayerStats,
          };
        })
      )
    : [];

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=30"
  );

  console.log(
    JSON.stringify(
      {
        TeamInfo,
        TeamForm,
        TeamPlayers,
      },
      null,
      2
    )
  );

  let FormWins = 0;

  for (const fixture of TeamForm?.fixtures ?? []) {
    if (fixture.score > fixture.opponentScore) {
      FormWins++;
    }
  }

  return {
    props: {
      info: TeamInfo,
      form: {
        ...TeamForm,
        wins: FormWins,
      },
      players: TeamPlayers.filter((player) => player !== null),
    },
  };
}

export default function Team({
  info,
  form,
  players,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  const sport = SportInfo("lol");

  if (!sport) {
    return (
      <>
        <Center>
          <Text>Unknown sport</Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack gap="sm">
            <FadeUpAni>
              <AdBanner />
            </FadeUpAni>

            <FadeUpAni>
              <PathDisplay
                path={[
                  {
                    text: `Team Profile`,
                    link: `/`,
                  },
                ]}
              />
            </FadeUpAni>

            <FadeUpAni>
              <TeamDetails
                sport={sport.name}
                logo={sport.logo}
                teamName={info.name}
                teamid={info.id}
              />
            </FadeUpAni>

            <FadeUpAni>
              <Card p={BigThenMd ? "20px" : "8px"}>
                <Grid columns={10} gutter={BigThenMd ? "sm" : "5px"}>
                  {Children.toArray(
                    players.map((player) => {
                      if (!player) {
                        return null;
                      }

                      return (
                        <>
                          <Grid.Col span={{ base: 2, md: 2 }}>
                            <TeamPlayerCard player={player} />
                          </Grid.Col>
                        </>
                      );
                    })
                  )}
                </Grid>
              </Card>
            </FadeUpAni>

            <FadeUpAni>
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
                          src={`/api/team/logo?id=${info.id}`}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 50 : 15}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />

                        <Text size={BigThenXs ? "md" : rem(8)}>
                          {info.name}
                        </Text>
                      </Flex>

                      <Stack gap={0}>
                        <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                          {form?.wins}
                        </Text>
                        <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                          Wins
                        </Text>
                      </Stack>

                      <Stack gap={0}>
                        <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                          {form?.fixtureCount}
                        </Text>
                        <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                          Overview
                        </Text>
                      </Stack>
                    </Flex>
                  </Card>

                  <Stack gap={0}>
                    {Children.toArray(
                      form?.fixtures?.map((fixture) => {
                        return (
                          <Paper
                            bg={"transparent"}
                            radius="sm"
                            px={BigThenXs ? "xl" : "xs"}
                            py="xs"
                          >
                            <Flex justify="space-between" align="center">
                              <Group>
                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  {NumTimeFormat(
                                    fixture.fixtureTime,
                                    "2017-12-31"
                                  )}
                                </Text>

                                <Divider orientation="vertical" size="sm" />

                                <Image
                                  src={`/api/team/logo?id=${info.id}`}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                  fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                />

                                {BigThenXs && (
                                  <Text size="sm">{info.name}</Text>
                                )}

                                <Image
                                  src={`/api/team/logo?id=${fixture.opponentId}`}
                                  fallbackSrc={
                                    "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                  }
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">{fixture.opponentName}</Text>
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
                                  Competition
                                </Text>
                              </Group>

                              <Group gap={SmallThenSm ? rem(7) : "md"}>
                                {sport.alias !== "lol" && (
                                  <>
                                    <Text
                                      size={BigThenXs ? "sm" : rem(8)}
                                      hiddenFrom="sm"
                                    >
                                      Nuke
                                    </Text>
                                    <Text
                                      size={BigThenXs ? "sm" : rem(8)}
                                      tt="uppercase"
                                      c="dimmed"
                                    >
                                      Nuke
                                    </Text>

                                    <Divider orientation="vertical" size="sm" />
                                  </>
                                )}

                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  <Text
                                    inherit
                                    span
                                    c={
                                      fixture.score > fixture.opponentScore
                                        ? "green"
                                        : "red"
                                    }
                                  >
                                    {fixture.score}
                                  </Text>{" "}
                                  -{" "}
                                  <Text
                                    inherit
                                    span
                                    c={
                                      fixture.score < fixture.opponentScore
                                        ? "green"
                                        : "red"
                                    }
                                  >
                                    {fixture.opponentScore}
                                  </Text>
                                </Text>
                              </Group>
                            </Flex>
                          </Paper>
                        );
                      })
                    )}
                  </Stack>
                </Stack>
              </Card>
            </FadeUpAni>
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
