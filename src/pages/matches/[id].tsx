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

  // console.log(JSON.stringify(match, null, 2));

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
      refetchInterval: 10000, // 10 seconds
      enabled: ["Scheduled", "Started"].includes(match.status),
      staleTime: 15000, // 15 seconds
    }
  );

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
                            return <Text p="xl">No Scoreboard Data</Text>;
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
