import { Center, Container, Grid, Stack, Text } from "@mantine/core";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { z } from "zod";
import { FadeUpAni } from "~/components/animation/fade-up";
import { LayoutComp } from "~/components/layout";
import { MatchSportSelector } from "~/components/match-page/sport-selector";
import { PathDisplay } from "~/components/pathdisplay";
import { SportApi } from "~/lib/sport-api";
import { api } from "~/utils/api";
import { MatchHeroComp } from "~/components/match-page/hero";
import { MatchBelowHeroComp } from "~/components/match-page/below-hero";
import { MatchStreamComp } from "~/components/match-page/stream-card";
import { MatchHeadToHeadComp } from "~/components/match-page/head-to-head";
import { MatchMapStatusComp } from "~/components/match-page/map-status";
import { MatchLineupComp } from "~/components/match-page/lineups";
import { MatchHistoryComp } from "~/components/match-page/match-history";
import { MatchMapsComp } from "~/components/match-page/maps";
import { MatchScoreboardCSGOComp } from "~/components/match-page/scoreboard/csgo";
import { MatchScoreboardLOLComp } from "~/components/match-page/scoreboard/lol";
import { MatchScoreboardDOTA2Comp } from "~/components/match-page/scoreboard/dota";
import { MatchScoreboardCODComp } from "~/components/match-page/scoreboard/cod";
import { MatchScoreboardVALOComp } from "~/components/match-page/scoreboard/valo";

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

  const match = await SportApi.Custom.Match.Call({
    id: parsedId.data,
  });

  if (!match) {
    return { notFound: true };
  }

  return {
    props: {
      match,
    },
  };
}

export default function AppTournamentManagePage({
  match,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const GetApi = api.fixture.get.useQuery(
    {
      id: match.id,
    },
    {
      initialData: match,
      refetchInterval: 1000 * 60 * 5, // 5 min in ms
      enabled: ["Scheduled", "Started"].includes(match.status),
      staleTime: 1000 * 60 * 5,
    }
  );

  /**
   * Consuming too much resources
   *
   * On hold for now
   *
   * Solution: Refetch every 10 seconds, caching time of api
   * becomes 10 second while the match is live and gets back to 5 min
   * when the match is over
   */
  // const [messageHistory, handleMessageHistory] = useListState([]);

  // const { sendJsonMessage, lastMessage } = useWebSocket(
  //   `wss://api.gamescorekeeper.com/v2/live/${match.id}`,
  //   {
  //     shouldReconnect: () => true,
  //     heartbeat: {
  //       interval: 30000, // 30 seconds
  //       message: "ping",
  //       returnMessage: "pong",
  //       timeout: 10000, // 10 seconds
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     const eventJson = JSON.parse(lastMessage.data as string) as {
  //       type: string;
  //     };

  //     console.log(lastMessage.data);

  //     if (eventJson.type === "auth") {
  //       sendJsonMessage({
  //         token:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJza3lsZXJjYW1wZXIiLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOi0zMzA5MDQ4MTMzMzUyOTY5Njk3LCJjdXN0b21lciI6dHJ1ZX0.9SkaL3AeufKMI_AAH_1PtYEYAy8FQ46EJjHKsTvDTRo",
  //       });
  //     }

  // const parsedMessage = SportApiZod.Event.All.safeParse(
  //   JSON.parse(lastMessage.data as string)
  // );

  // if (!parsedMessage.success) {
  //   console.log("Failed to parse message");
  //   console.log({
  //     err: parsedMessage.error,
  //     message: lastMessage.data,
  //   });
  //   return;
  // }

  // const event = parsedMessage.data;

  // if (event.type === "auth") {
  //   sendJsonMessage({
  //     token:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJza3lsZXJjYW1wZXIiLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOi0zMzA5MDQ4MTMzMzUyOTY5Njk3LCJjdXN0b21lciI6dHJ1ZX0.9SkaL3AeufKMI_AAH_1PtYEYAy8FQ46EJjHKsTvDTRo",
  //   });
  //   return;
  // }

  // console.log(event);
  //   }
  // }, [lastMessage]);

  if (GetApi.isLoading) {
    return (
      <>
        <Center>
          <Text>Loading...</Text>
        </Center>
      </>
    );
  }

  if (GetApi.isError) {
    return (
      <>
        <Center>
          <Text>Error</Text>
        </Center>
      </>
    );
  }

  if (!GetApi.data) {
    return (
      <>
        <Center>
          <Text>Match not found</Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack gap="xs">
            <FadeUpAni>
              <MatchSportSelector
                sport={GetApi.data.sport}
                disabled
                setSport={(sport) => {
                  console.log(sport);
                }}
              />
            </FadeUpAni>

            <FadeUpAni>
              <PathDisplay
                path={[
                  {
                    text: `${GetApi.data.sport.alias} Matches`,
                    link: `/matches?m-sport=${GetApi.data.sport.alias}`,
                  },
                  {
                    text: match.competition.name,
                    link: `/matches/${match.id}`,
                  },
                ]}
              />
            </FadeUpAni>

            <FadeUpAni>
              <MatchHeroComp match={GetApi.data} />
            </FadeUpAni>

            <FadeUpAni>
              <MatchBelowHeroComp match={GetApi.data} />
            </FadeUpAni>

            {match.status === "Started" && (
              <>
                <MatchStreamComp match={GetApi.data} />
              </>
            )}

            {/* Maps */}
            {["cs2", "valorant", "codmwiii"].includes(
              GetApi.data.sport.alias
            ) && (
              <FadeUpAni>
                <MatchMapsComp match={GetApi.data} />
              </FadeUpAni>
            )}
            {/* Maps */}

            {(() => {
              if (["dota2", "lol"].includes(GetApi.data.sport.alias)) {
                return (
                  <>
                    {(() => {
                      if (GetApi.data.status === "Scheduled") {
                        return <></>;
                      }

                      if (GetApi.data.sport.alias === "lol") {
                        return <MatchScoreboardLOLComp match={GetApi.data} />;
                      }

                      if (GetApi.data.sport.alias === "dota2") {
                        return <MatchScoreboardDOTA2Comp match={GetApi.data} />;
                      }

                      return <Text p="xl">Unsupported Game</Text>;
                    })()}

                    <FadeUpAni>
                      <Grid columns={10} gutter="xs">
                        <Grid.Col span={{ base: 10, md: 7 }}>
                          <MatchLineupComp match={GetApi.data} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 10, md: 3 }}>
                          <MatchHistoryComp match={GetApi.data} />
                        </Grid.Col>
                      </Grid>
                    </FadeUpAni>
                  </>
                );
              }

              return (
                <>
                  <FadeUpAni>
                    <Grid columns={10} gutter="xs">
                      <Grid.Col span={{ base: 10, md: 7 }}>
                        {(() => {
                          if (GetApi.data?.status === "Scheduled") {
                            return <MatchLineupComp match={GetApi.data} />;
                          }

                          if (GetApi.data?.sport.alias === "cs2") {
                            return (
                              <MatchScoreboardCSGOComp match={GetApi.data} />
                            );
                          }

                          if (GetApi.data?.sport.alias === "codmwiii") {
                            return (
                              <MatchScoreboardCODComp match={GetApi.data} />
                            );
                          }

                          if (GetApi.data.sport.alias === "valorant") {
                            return <MatchScoreboardVALOComp match={GetApi.data} />;
                          }

                          return <Text p="xl">Unsupported Game</Text>;
                        })()}
                      </Grid.Col>

                      <Grid.Col span={{ base: 10, md: 3 }}>
                        <MatchHistoryComp match={GetApi.data} />
                      </Grid.Col>
                    </Grid>
                  </FadeUpAni>

                  {GetApi.data.status !== "Scheduled" && (
                    <FadeUpAni>
                      <MatchLineupComp match={GetApi.data} />
                    </FadeUpAni>
                  )}
                </>
              );
            })()}

            {GetApi.data.status !== "Scheduled" &&
              ["cs2", "valorant"].includes(GetApi.data.sport.alias) && (
                <FadeUpAni>
                  <MatchMapStatusComp match={GetApi.data} />
                </FadeUpAni>
              )}

            <FadeUpAni>
              <MatchHeadToHeadComp match={GetApi.data} />
            </FadeUpAni>
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
