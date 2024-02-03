import {
  Box,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
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
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import moment from "moment";
import { api } from "~/utils/api";
import { MatchHeroComp } from "~/components/match-page/hero";
import { MatchBelowHeroComp } from "~/components/match-page/below-hero";
import { MatchStreamComp } from "~/components/match-page/stream-card";
import { MatchHeadToHeadComp } from "~/components/match-page/head-to-head";
import { MatchMapStatusComp } from "~/components/match-page/map-status";
import { MatchLineupComp } from "~/components/match-page/lineups";
import {
  MatchScoreboardComp,
  ScoreBoardHead,
  ScoreBoardRow,
} from "~/components/match-page/scoreboard";
import { MatchHistoryComp } from "~/components/match-page/match-history";
import { MatchMapsComp } from "~/components/match-page/maps";

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

  console.log({
    match,
    opponentMatches: match?.opponentMatches?.fixtures,
    pickBan: match?.pickBan,
    participantsOne: match?.participants.one.team?.most_recent_lineup,
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
      refetchInterval: 10000, // 10 seconds
      enabled: ["Scheduled", "Started"].includes(match.status),
      staleTime: 15000, // 15 seconds
    }
  );

  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

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
                sport={GetApi.data.sportInfo}
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
                    text: `${GetApi.data.sportInfo.alias} Matches`,
                    link: `/matches?m-sport=${GetApi.data.sportInfo.alias}`,
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

            {match.status !== "Scheduled" &&
              ["dota2", "lol"].includes(GetApi.data.sportInfo.alias) && (
                <FadeUpAni>
                  <Grid columns={10}>
                    <Grid.Col span={{ base: 10, md: 5 }}>
                      <Card>
                        <SegmentedControl
                          h={50}
                          size="xs"
                          color="black"
                          radius="ms"
                          styles={{
                            label: {
                              height: "100%",
                            },
                            root: {
                              background: "transparent",
                              border: "1px solid var(--mantine-color-dimmed)",
                            },
                          }}
                          data={[
                            {
                              value: "match1",
                              label: (
                                <>
                                  <Text
                                    size="xs"
                                    h={"100%"}
                                    py={5}
                                    my={3}
                                    c={"#fff"}
                                    mx="md"
                                  >
                                    Match 1
                                  </Text>
                                </>
                              ),
                            },
                            {
                              value: "match2",
                              label: (
                                <>
                                  <Text
                                    size="xs"
                                    h={"100%"}
                                    py={5}
                                    my={3}
                                    c={"#fff"}
                                    mx="md"
                                  >
                                    Match 2
                                  </Text>
                                </>
                              ),
                            },
                            {
                              value: "match3",
                              label: (
                                <>
                                  <Text
                                    size="xs"
                                    h={"100%"}
                                    py={5}
                                    my={3}
                                    c={"#fff"}
                                    mx="md"
                                  >
                                    Match 3
                                  </Text>
                                </>
                              ),
                            },
                          ]}
                        />

                        <Box
                          display={"flex"}
                          w="100%"
                          p="md"
                          style={{ justifyContent: "space-between" }}
                        >
                          <Image
                            src={`/api/team/logo?id=${match.participants.one
                              .id!}`}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 50 : 25}
                            fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                          />

                          <Box
                            display={"flex"}
                            style={{ flexDirection: "column" }}
                          >
                            <p style={{ textAlign: "center" }}>MATCH ENDED</p>
                            <Box display={"flex"} style={{ gap: "10px" }}>
                              <Box
                                display={"flex"}
                                style={{ flexDirection: "column" }}
                              >
                                <Title order={3}>
                                  {match.participants.one.score}
                                </Title>
                              </Box>
                              <Box
                                display={"flex"}
                                style={{
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <Text c="dark" size="sm">
                                  Duration
                                </Text>
                                <Text>
                                  {match.endTime ? (
                                    <>
                                      {moment(match.endTime).diff(
                                        moment(match.startTime),
                                        "m"
                                      )}{" "}
                                      :{" "}
                                      {moment(match.endTime).diff(
                                        moment(match.startTime),
                                        "s"
                                      ) % 60}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Text>
                              </Box>
                              <Box
                                display={"flex"}
                                style={{ flexDirection: "column" }}
                              >
                                <Title order={3}>
                                  {match.participants.two.score}
                                </Title>
                              </Box>
                            </Box>
                          </Box>

                          <Image
                            src={`/api/team/logo?id=${match.participants.two
                              .id!}`}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 50 : 25}
                            fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                          />
                        </Box>

                        <Flex direction="column" gap="sm">
                          <Flex justify="space-between">
                            <Text c="red">5</Text>
                            <Text>Turrets</Text>
                            <Text c="blue">9</Text>
                          </Flex>
                          <Divider />
                          <Flex justify="space-between">
                            <Text c="red">0</Text>
                            <Text>Inhibitors</Text>
                            <Text c="blue">2</Text>
                          </Flex>
                          <Divider />
                          <Flex justify="space-between">
                            <Text c="red">0</Text>
                            <Text>Barons</Text>
                            <Text c="blue">0</Text>
                          </Flex>
                          <Divider />
                          <Flex justify="space-between">
                            <Text c="red">0</Text>
                            <Text>Dragons</Text>
                            <Text c="blue">0</Text>
                          </Flex>
                        </Flex>
                      </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 10, md: 5 }}>
                      <Card>
                        <Title
                          order={5}
                          p={"md"}
                          tt={"uppercase"}
                          ta={"center"}
                          style={{
                            backgroundColor: "#4a4848",
                            borderRadius: "10px",
                          }}
                        >
                          Champions
                        </Title>

                        <Box
                          display={"flex"}
                          p={"sm"}
                          w={"100%"}
                          style={{
                            gap: "10px",
                            borderBottom: "1px solid #4a4848",
                          }}
                        >
                          <Image
                            src={`/api/team/logo?id=${match.participants.one
                              .id!}`}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                            fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                          />
                          {match.participants.one.name}
                        </Box>

                        <Box
                          display={"flex"}
                          p={"sm"}
                          w={"100%"}
                          style={{ gap: "20px", alignItems: "center" }}
                        >
                          <Box
                            bg={"#090909"}
                            py={"xs"}
                            px={"md"}
                            style={{ borderRadius: "10px" }}
                          >
                            Ban
                          </Box>
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                        </Box>

                        <Box
                          display={"flex"}
                          p={"sm"}
                          w={"100%"}
                          style={{ gap: "20px", alignItems: "center" }}
                        >
                          <Box
                            bg={"#090909"}
                            py={"xs"}
                            px={"md"}
                            style={{ borderRadius: "10px" }}
                          >
                            Pick
                          </Box>
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                        </Box>

                        <Box
                          display={"flex"}
                          p={"sm"}
                          w={"100%"}
                          style={{
                            gap: "10px",
                            borderBottom: "1px solid #4a4848",
                          }}
                        >
                          <Image
                            src={`/api/team/logo?id=${match.participants.two
                              .id!}`}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                            fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                          />
                          {match.participants.two.name}
                        </Box>

                        <Box
                          display={"flex"}
                          p={"sm"}
                          w={"100%"}
                          style={{ gap: "20px", alignItems: "center" }}
                        >
                          <Box
                            bg={"#090909"}
                            py={"xs"}
                            px={"md"}
                            style={{ borderRadius: "10px" }}
                          >
                            Ban
                          </Box>
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                        </Box>

                        <Box
                          display={"flex"}
                          p={"sm"}
                          w={"100%"}
                          style={{ gap: "20px", alignItems: "center" }}
                        >
                          <Box
                            bg={"#090909"}
                            py={"xs"}
                            px={"md"}
                            style={{ borderRadius: "10px" }}
                          >
                            Pick
                          </Box>
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                          <Image
                            src="/item.png"
                            w={SmallThenSm ? 12 : 28}
                            h={SmallThenSm ? 12 : 28}
                            alt="Item"
                          />
                        </Box>
                      </Card>
                    </Grid.Col>
                  </Grid>
                </FadeUpAni>
              )}

            {/* Maps */}
            {["cs2", "valorant", "codmwiii"].includes(
              GetApi.data.sportInfo.alias
            ) && (
              <FadeUpAni>
                <MatchMapsComp match={GetApi.data} />
              </FadeUpAni>
            )}
            {/* Maps */}

            {match.status !== "Scheduled" &&
              ["lol", "dota2"].includes(GetApi.data.sportInfo.alias) && (
                <Card p="lg">
                  <Stack gap="xl">
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                      <Stack>
                        <ScoreBoardHead
                          game={GetApi.data.sportInfo.alias}
                          teamId={match.participants.one.id!}
                          name={match.participants.one.name!}
                          bg="yellow.5"
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.one.name!}
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.one.name!}
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.one.name!}
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.one.name!}
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.one.name!}
                        />
                      </Stack>

                      <Stack>
                        <ScoreBoardHead
                          game={GetApi.data.sportInfo.alias}
                          teamId={match.participants.two.id!}
                          name={match.participants.two.name!}
                          bg="blue.5"
                        />

                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.two.name!}
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.two.name!}
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.two.name!}
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.two.name!}
                        />
                        <ScoreBoardRow
                          game={GetApi.data.sportInfo.alias}
                          name={match.participants.two.name!}
                        />
                      </Stack>
                    </SimpleGrid>
                  </Stack>
                </Card>
              )}

            <FadeUpAni>
              <Grid columns={10} gutter="xs">
                <Grid.Col span={{ base: 10, md: 7 }}>
                  <Stack>
                    {match.status !== "Scheduled" &&
                      !["dota2", "lol"].includes(
                        GetApi.data.sportInfo.alias
                      ) && <MatchScoreboardComp match={GetApi.data} />}

                    <MatchLineupComp match={GetApi.data} />
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 10, md: 3 }}>
                  <MatchHistoryComp match={GetApi.data} />
                </Grid.Col>
              </Grid>
            </FadeUpAni>

            {/* {match.status !== "Scheduled" &&
              !["dota2", "lol"].includes(GetApi.data.sportInfo.alias) && (
                <FadeUpAni>
                  <MatchLineupComp match={GetApi.data} />
                </FadeUpAni>
              )} */}

            {match.status !== "Scheduled" &&
              ["cs2", "valorant"].includes(GetApi.data.sportInfo.alias) && (
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
