import dynamic from "next/dynamic";

import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Overlay,
  Paper,
  Progress,
  SegmentedControl,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { Children } from "react";
import { z } from "zod";
import { FadeUpAni } from "~/components/animation/fade-up";
import { LayoutComp } from "~/components/layout";
import { LogoIcon, LogoIconSm } from "~/components/logo/icon";
import { MatchSportSelector } from "~/components/match-page/sport-selector";
import { PathDisplay } from "~/components/pathdisplay";
import { NumTimeFormat, SportInfo, UTCToLocalTime } from "~/lib/functions";
import { useTimeLeft } from "~/lib/hooks/useTimeLeft";
import { SportApi } from "~/lib/sport-api";
import { CircleFlag } from "react-circle-flags";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBomb,
  IconCross,
  IconCurrencyDollar,
  IconLetterA,
  IconLetterD,
  IconLetterK,
  IconShieldFilled,
} from "@tabler/icons-react";
import moment from 'moment';
// import { PlayerGet } from "~/lib/sport-api/player/get";

const ReactTwitchEmbedVideo = dynamic(
  () => import("react-twitch-embed-video"),
  {
    ssr: false,
  }
);

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

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=30"
  );

  // console.log(JSON.stringify(match, null, 2));

  return {
    props: {
      match,
    },
  };
}

const PlayerCard = (props: { id: number; name: string }) => {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Card
        withBorder
        p={BigThenXs ? "xs" : 0}
        style={{
          backgroundImage: "url(/player.jpg)",
        }}
      >
        <Stack gap={5} mb={BigThenXs ? 0 : rem(10)}>
          <Image src="/playerimg.png" alt={props.name} radius={6} fit="contain" />

          <Group justify="center" gap={5}>
            <Text ta="center" size={BigThenXs ? rem(15) : rem(9)}>
              {props.name}
            </Text>

            <CircleFlag countryCode="" height={BigThenXs ? 15 : 10} />
          </Group>
        </Stack>
      </Card>
    </>
  );
};

const ScoreBoardHead = (props: {
  game: string;
  teamId: number;
  name: string;
  bg: string;
}) => {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  const iconXs = BigThenXs ? 18 : 12;

  return (
    <>
      <Flex align="center" justify="space-between">
        <Paper py="xs" px={BigThenXs ? "md" : "xs"} radius="xl" bg={props.bg}>
          <Flex align="center" gap={BigThenXs ? "xs" : rem(5)}>
            <Image
              src={`/api/team/logo?id=${props.teamId}`}
              alt="league logo"
              fit="contain"
              h={BigThenXs ? 20 : 15}
              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
            />
            <Text size={BigThenXs ? "sm" : rem(10)} c="black">
              {props.name}
            </Text>
          </Flex>
        </Paper>

        {props.game == "cs2" && (
          <Flex gap={BigThenXs ? rem(20) : rem(2)} align="center">
            <Box miw={30} ta="center"><IconCurrencyDollar size={iconXs} /></Box>
            <Box miw={25} ta="center"><IconCross size={iconXs} /></Box>
            <Box miw={25} ta="center"><IconShieldFilled size={iconXs} /></Box>
            <Box miw={25} ta="center"><IconLetterK size={iconXs} /></Box>
            <Box miw={25} ta="center"><IconLetterA size={iconXs} /></Box>
            <Box miw={25} ta="center"><IconLetterD size={iconXs} /></Box>
            <Box miw={30} ta="center" display="flex"><Text size={BigThenXs ? rem(18) : rem(11)}>ADR</Text></Box>
          </Flex>
        )}
        {props.game == "valorant" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>Agent</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>K</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>D</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>A</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>HS%</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>FK</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>FD</Text>
            </Box>
          </Flex>
        )}
        {(props.game == "lol" || props.game == "dota2") && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>K</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>D</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>A</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>CS</Text>
            </Box>
          </Flex>
        )}
        {props.game == "rl" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Goals</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Asissts</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Saves</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Shots</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Demos</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Demoed</Text>
            </Box>
          </Flex>
        )}
        {props.game == "codmwiii" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>K</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>D</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>K/D</Text>
            </Box>
            <Box miw={SmallThenSm ? 50 : 70} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Damage</Text>
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
};

const ScoreBoardRow = (props: { name: string; game: string }) => {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  const iconXs = BigThenXs ? "xs" : rem(8);

  return (
    <>
      <Flex align="center" justify="space-between">
        <Text size={BigThenXs ? "md" : rem(12)}>{props.name}</Text>

        {props.game == "cs2" && (
          <Flex gap={BigThenXs ? rem(20) : rem(2)}>
            <Box miw={30} ta="center"><Text size={iconXs}>$4950</Text></Box>
            <Flex miw={25}>
              <Progress
                my="auto"
                mx="auto"
                value={65}
                w={BigThenXs ? 20 : 16}
                color="white"
                size="sm"
              />
            </Flex>
            <Box miw={25} ta="center"><Text size={iconXs}>200</Text></Box>
            <Box miw={25} ta="center"><Text size={iconXs}>23</Text></Box>
            <Box miw={25} ta="center"><Text size={iconXs}>6</Text></Box>
            <Box miw={25} ta="center"><Text size={iconXs}>12</Text></Box>
            <Box miw={30} ta="center"><Text size={iconXs}>963.0</Text></Box>
          </Flex>
        )}
        {props.game == "valorant" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={40} ta="center">
              <Image
                mx="auto"
                src="/heroavatar.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Hero"
              />
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>200</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>6</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>50%</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>12</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>32</Text>
            </Box>
          </Flex>
        )}
        {(props.game == "lol" || props.game == "dota2") && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Flex gap={0}>
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
            </Flex>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>6</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>12</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>963.0</Text>
            </Box>
          </Flex>
        )}
        {props.game == "rl" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>200</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>6</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>0</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>0</Text>
            </Box>
          </Flex>
        )}
        {props.game == "codmwiii" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>6</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>12</Text>
            </Box>
            <Box miw={SmallThenSm ? 50 : 70} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>963.0</Text>
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
};

const MatchStats = () => {
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  return (
    <>
      <SegmentedControl
        size={SmallThenSm ? "sm" : "lg"}
        data={["All Maps", "Map 1", "Map 2", "Map 3"]}
      />
    </>
  );
};

export default function AppTournamentManagePage({
  match,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const sport = SportInfo(match.sport.alias);

  const timeLeft = useTimeLeft(UTCToLocalTime(match.scheduledStartTime));

  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  if (!sport) {
    return (
      <>
        <Center>
          <Text>Unknown sport</Text>
        </Center>
      </>
    );
  }

  console.log(match);
  const teamOneLength =
    match.participants.one.team?.most_recent_lineup?.length ?? 0;
  const teamTwoLength =
    match.participants.two.team?.most_recent_lineup?.length ?? 0;

  const teamOneTotalScore = match.maps?.reduce((totalScore, map) => totalScore + (map.roundScores?.[0]?.roundsWon ?? 0), 0);
  const teamTwoTotalScore = match.maps?.reduce((totalScore, map) => totalScore + (map.roundScores?.[1]?.roundsWon ?? 0), 0);

  const teamOneOdd = match.odds.one.length ? match.odds.one.reduce((totalOdd, odd) => totalOdd + (odd.decimalOdd ?? 0), 0) / (match.odds.one.length ? match.odds.one.length : 1) : "NA";
  const teamTwoOdd = match.odds.two.length ? match.odds.two.reduce((totalOdd, odd) => totalOdd + (odd.decimalOdd ?? 0), 0) / (match.odds.two.length ? match.odds.two.length : 1) : "NA";

  // const teamOneTotalScore = match.maps?.reduce((totalScore, map) => totalScore + map.roundScores[1]?.roundsWon);

  const teamLength =
    teamOneLength > teamTwoLength ? teamOneLength : teamTwoLength;

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack gap="xs">
            <FadeUpAni>
              <MatchSportSelector
                sport={sport}
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
                    text: `${sport.alias} Matches`,
                    link: `/matches?m-sport=${sport.alias}`,
                  },
                  {
                    text: match.competition.name,
                    link: `/matches/${match.id}`,
                  },
                ]}
              />
            </FadeUpAni>

            {/* Hero */}
            <FadeUpAni>
              <Card
                style={{
                  backgroundImage: `url(/match-view-card-bg.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                withBorder
              >
                <Overlay
                  style={{
                    zIndex: 1,
                  }}
                  blur={15}
                  opacity={0.75}
                  gradient="linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)"
                />
                <Stack
                  align="center"
                  style={{
                    zIndex: 2,
                  }}
                >
                  <Group justify="center" grow w="100%" gap={5}>
                    <Text
                      truncate="end"
                      maw={BigThenXs ? rem(400) : rem(150)}
                      ta="right"
                      fw="bold"
                      size={BigThenXs ? rem(40) : rem(15)}
                      tt="uppercase"
                      ff="STNO"
                    >
                      {match.participants.one.name}
                    </Text>

                    <Image
                      src="/vs.svg"
                      h={BigThenXs ? rem(60) : rem(30)}
                      w={BigThenXs ? rem(60) : rem(30)}
                      alt="box"
                      fit="contain"
                      style={{
                        flexGrow: 0,
                      }}
                    />

                    <Text
                      truncate="end"
                      maw={BigThenXs ? rem(400) : rem(150)}
                      ta="left"
                      fw="bold"
                      size={BigThenXs ? rem(40) : rem(15)}
                      tt="uppercase"
                      ff="STNO"
                    >
                      {match.participants.two.name}
                    </Text>
                  </Group>

                  <Divider size="sm" maw={800} w="100%" />

                  <Group>
                    <Card
                      p={BigThenXs ? "sm" : "xs"}
                      miw={BigThenXs ? rem(350) : rem(100)}
                      style={{
                        backgroundColor: "rgba(221, 0, 18, 0.45)",
                        position: "relative",
                      }}
                    >
                      <Group mx="auto" gap={BigThenXs ? "md" : 10}>
                        <Stack gap={5}>
                          <Text size={BigThenXs ? "xl" : rem(10)} ta="right">
                            {match.participants.one.name}
                          </Text>

                          <Group justify="end" gap={rem(5)}>
                            <Text size={BigThenXs ? "xs" : rem(10)} ta="right">
                              {match.participants.one.team?.country ??
                                "Unknown"}
                            </Text>

                            <CircleFlag
                              countryCode={
                                match.participants.one.team?.countryISO?.toLowerCase() ??
                                ""
                              }
                              height={BigThenXs ? 16 : 10}
                            />
                          </Group>
                        </Stack>

                        <Image
                          src={`/api/team/logo?id=${match.participants.one.id}`}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? rem(30) : rem(10)}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                      </Group>
                      <Image
                        style={{
                          position: "absolute",
                          bottom: "50%",
                          right: 0,
                          transform: "translateY(50%)",
                          width: "25%",
                          zIndex: 1,
                          opacity: 0.3,
                        }}
                        src={`/api/team/logo?id=${match.participants.one.id}`}
                        alt="as"
                      />
                    </Card>

                    <Title order={BigThenXs ? 3 : 5}>
                      {teamOneTotalScore}:{teamTwoTotalScore}
                    </Title>

                    <Card
                      p={BigThenXs ? "md" : "xs"}
                      miw={BigThenXs ? rem(350) : rem(100)}
                      style={{
                        backgroundColor: "rgba(0, 165, 57, 0.45)",
                        position: "relative",
                      }}
                    >
                      <Group mx="auto" gap={10}>
                        <Image
                          src={`/api/team/logo?id=${match.participants.two.id}`}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? rem(30) : rem(10)}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                        <Stack gap={rem(5)}>
                          <Text size={BigThenXs ? "xl" : rem(10)} ta="left">
                            {match.participants.two.name}
                          </Text>

                          <Group justify="start" gap={rem(5)}>
                            <CircleFlag
                              countryCode={
                                match.participants.two.team?.countryISO?.toLowerCase() ??
                                ""
                              }
                              height={BigThenXs ? 16 : 10}
                            />
                            <Text size={rem(10)} ta="left">
                              {match.participants.two.team?.country ??
                                "Unknown"}
                            </Text>
                          </Group>
                        </Stack>
                      </Group>
                      <Image
                        style={{
                          position: "absolute",
                          bottom: "50%",
                          left: 0,
                          transform: "translateY(50%)",
                          width: "25%",
                          zIndex: 1,
                          opacity: 0.3,
                        }}
                        src={`/api/team/logo?id=${match.participants.two.id}`}
                        alt="as"
                      />
                    </Card>
                  </Group>

                  <Stack align="center" gap={5}>
                    <Text fw="bold" size="xs">
                      {NumTimeFormat(
                        UTCToLocalTime(match.scheduledStartTime),
                        "19th December 2021"
                      )}
                    </Text>

                    <Text size="xs">
                      <Text inherit span c="dimmed">
                        BO{match.format.value}
                      </Text>{" "}
                      -{" "}
                      {(() => {
                        if (match.status === "Scheduled") {
                          return <>Starts in {timeLeft}</>;
                        }

                        if (match.status === "Started") {
                          if (match.startTime === null) return <>Started</>;

                          return (
                            <>
                              Started at{" "}
                              {NumTimeFormat(
                                UTCToLocalTime(match.startTime),
                                "14:00"
                              )}
                            </>
                          );
                        }

                        if (match.status === "Ended") {
                          if (match.endTime === null) return <>Ended</>;

                          return (
                            <>
                              Finished at{" "}
                              {NumTimeFormat(
                                UTCToLocalTime(match.endTime),
                                "14:00"
                              )}
                            </>
                          );
                        }

                        return match.status;
                      })()}
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </FadeUpAni>
            {/* Hero */}

            {/* Below Hero */}
            <FadeUpAni>
              <Card p={BigThenXs ? "lg" : "sm"} py={BigThenXs ? rem(30) : "xl"}>
                <Flex
                  justify="space-between"
                  align="center"
                  wrap="nowrap"
                  w="100%"
                  gap={BigThenXs ? "md" : 0}
                >
                  <Box miw={BigThenXs ? 150 : 50}>
                    {BigThenXs ? <LogoIcon /> : <LogoIconSm />}
                  </Box>

                  <Flex
                    justify="center"
                    align="center"
                    wrap="nowrap"
                    w="100%"
                    gap={BigThenXs ? "md" : 0}
                  >
                    <Flex
                      w="100%"
                      justify="end"
                      align="center"
                      direction={BigThenXs ? "row" : "column"}
                      gap={BigThenXs ? "md" : rem(5)}
                    >
                      <Image
                        src={`/api/team/logo?id=${match.participants.one.id}`}
                        alt="league logo"
                        fit="contain"
                        h={BigThenXs ? 30 : 15}
                        w={BigThenXs ? 30 : 15}
                        fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                      />

                      <Text size={BigThenXs ? "lg" : rem(10)}>
                        {match.participants.one.name}
                      </Text>

                      <Paper
                        bg="dark.5"
                        px={BigThenXs ? rem(6) : rem(5)}
                        py={BigThenXs ? rem(3) : rem(5)}
                      >
                        <Text size={BigThenXs ? "md" : rem(10)}>
                          {teamOneOdd}
                        </Text>
                      </Paper>
                    </Flex>

                    <Image
                      src="/vs.svg"
                      h={BigThenXs ? 40 : 20}
                      w={BigThenXs ? 40 : 20}
                      alt="box"
                      fit="contain"
                    />

                    <Flex
                      w="100%"
                      justify="start"
                      align="center"
                      direction={BigThenXs ? "row" : "column"}
                      gap={BigThenXs ? "md" : rem(5)}
                    >
                      <Paper
                        bg="dark.5"
                        px={BigThenXs ? rem(6) : rem(5)}
                        py={BigThenXs ? rem(3) : rem(5)}
                      >
                        <Text size={BigThenXs ? "md" : rem(10)}>
                          {teamTwoOdd}
                        </Text>
                      </Paper>

                      <Text size={BigThenXs ? "lg" : rem(10)}>
                        {match.participants.one.name}
                      </Text>

                      <Image
                        src={`/api/team/logo?id=${match.participants.one.id}`}
                        alt="league logo"
                        fit="contain"
                        h={BigThenXs ? 30 : 15}
                        w={BigThenXs ? 30 : 15}
                        fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                      />
                    </Flex>
                  </Flex>

                  <Group miw={BigThenXs ? 150 : 50} justify="end">
                    <Button size={BigThenXs ? "sm" : "compact-xs"}>
                      <Text size={BigThenXs ? "sm" : rem(9)}>Bet Now</Text>
                    </Button>
                  </Group>
                </Flex>
              </Card>
            </FadeUpAni>
            {/* Below Hero */}

            {match.status === "Started" && (
              <>
                <Card p="lg">
                  <Stack gap="xl">
                    <Group>
                      <Title order={5} tt="uppercase">
                        LiveStream
                      </Title>

                      <div
                        style={{
                          backgroundColor: "var(--mantine-color-red-6)",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                        }}
                      />
                    </Group>

                    {(match.streams?.length ?? 0) >= 0 ? (
                      <ReactTwitchEmbedVideo
                        width="100%"
                        channel="talk2megooseman"
                        layout="video"
                        height={BigThenXs ? "500px" : "250px"}
                      />
                    ) : (
                      <Center h="500px">
                        <Title maw={500} order={4} ta="center">
                          No stream available for this match. Please check back
                          later.
                        </Title>
                      </Center>
                    )}
                  </Stack>
                </Card>
              </>
            )}

            {match.status !== "Scheduled" && sport.alias !== "cs2" && sport.alias !== "rl" && sport.alias !== "val" && sport.alias !== "codmwiii" && (
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
                                <Text size="xs" h={"100%"} py={5} my={3} c={"#fff"} mx="md">
                                  Match 1
                                </Text>
                              </>
                            ),
                          },
                          {
                            value: "match2",
                            label: (
                              <>
                                <Text size="xs" h={"100%"} py={5} my={3} c={"#fff"} mx="md">
                                  Match 2
                                </Text>
                              </>
                            ),
                          },
                          {
                            value: "match3",
                            label: (
                              <>
                                <Text size="xs" h={"100%"} py={5} my={3} c={"#fff"} mx="md">
                                  Match 3
                                </Text>
                              </>
                            ),
                          },
                        ]}
                      />

                      <Box display={"flex"} w="100%" p="md" style={{ justifyContent: "space-between", }}>
                        <Image
                          src={`/api/team/logo?id=${match.participants.one.id!}`}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 50 : 25}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />

                        <Box display={"flex"} style={{ flexDirection: "column", }}>
                          <p style={{textAlign: "center"}}>MATCH ENDED</p>
                          <Box display={"flex"} style={{ gap: "10px", }}>
                            <Box display={"flex"} style={{ flexDirection: "column", }}>
                              <Title order={3}>{match.participants.one.score}</Title>
                            </Box>
                            <Box display={"flex"} style={{flexDirection: "column", alignItems: "center"}}>
                              <Text c="dark" size="sm">
                                Duration
                              </Text>
                              <Text>
                                {
                                  match.endTime ? (
                                    <>{moment(match.endTime).diff(moment(match.startTime), "m")} : {moment(match.endTime).diff(moment(match.startTime), "s") % 60}</>
                                  ) : <></>
                                }
                              </Text>
                            </Box>
                            <Box display={"flex"} style={{ flexDirection: "column", }}>
                              <Title order={3}>{match.participants.two.score}</Title>
                            </Box>
                          </Box>
                        </Box>

                        <Image
                          src={`/api/team/logo?id=${match.participants.two.id!}`}
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
                      <Title order={5} p={"md"} tt={"uppercase"} ta={"center"} style={{
                        backgroundColor: "#4a4848",
                        borderRadius: "10px",
                      }}>Champions</Title>

                      <Box display={"flex"} p={"sm"} w={"100%"} style={{ gap: "10px", borderBottom: "1px solid #4a4848", }}>
                        <Image
                          src={`/api/team/logo?id=${match.participants.one.id!}`}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 20 : 15}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                        {match.participants.one.name}
                      </Box>
                      
                      <Box display={"flex"} p={"sm"} w={"100%"} style={{ gap: "20px", alignItems: "center" }}>
                        <Box bg={"#090909"} py={"xs"} px={"md"} style={{ borderRadius: "10px", }} >Ban</Box>
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                      </Box>
                      
                      <Box display={"flex"} p={"sm"} w={"100%"} style={{ gap: "20px", alignItems: "center" }}>
                        <Box bg={"#090909"} py={"xs"} px={"md"} style={{ borderRadius: "10px", }} >Pick</Box>
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                      </Box>

                      <Box display={"flex"} p={"sm"} w={"100%"} style={{ gap: "10px", borderBottom: "1px solid #4a4848", }}>
                        <Image
                          src={`/api/team/logo?id=${match.participants.two.id!}`}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 20 : 15}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                        {match.participants.two.name}
                      </Box>
                      
                      <Box display={"flex"} p={"sm"} w={"100%"} style={{ gap: "20px", alignItems: "center" }}>
                        <Box bg={"#090909"} py={"xs"} px={"md"} style={{ borderRadius: "10px", }} >Ban</Box>
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                      </Box>
                      
                      <Box display={"flex"} p={"sm"} w={"100%"} style={{ gap: "20px", alignItems: "center" }}>
                        <Box bg={"#090909"} py={"xs"} px={"md"} style={{ borderRadius: "10px", }} >Pick</Box>
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                        <Image src="/item.png" w={SmallThenSm ? 12 : 28} h={SmallThenSm ? 12 : 28} alt="Item" />
                      </Box>

                    </Card>
                  </Grid.Col>
                </Grid>
              </FadeUpAni>
            )}

            {sport.alias !== "lol" &&
              sport.alias !== "dota2" &&
              sport.alias !== "rl" && (
                <FadeUpAni>
                  <SimpleGrid cols={{ base: 1, md: sport.alias === "codmwiii" ? 1 : 2 }}>
                    <Card p="lg">
                      <Stack>
                        <Title order={5} tt="uppercase">
                          Maps
                        </Title>

                        <Divider />

                        <SimpleGrid cols={{base: sport.alias === "codmwiii" ? 3 : 1, md: sport.alias === "codmwiii" ? 4 : 1}}>
                          {Children.toArray(
                            Array.from(match.maps ?? []).map((map) => (
                              <>
                                <Card
                                  style={{
                                    backgroundImage: "url(/map.jpg)",
                                  }}
                                >
                                  <Overlay
                                    style={{
                                      zIndex: 1,
                                    }}
                                  />
                                  <div
                                    style={{
                                      zIndex: 2,
                                    }}
                                  >
                                    {
                                      match.status === "Scheduled" &&
                                      <Flex align="center" justify="center">
                                        <Title order={3} ta="center">
                                          {map.mapName}
                                        </Title>
                                      </Flex>
                                    }

                                    {match.status !== "Scheduled" && (sport.alias === "cs2" || sport.alias === "valorant") &&
                                      <Flex align="center" justify="space-between">
                                        <Title order={3}>
                                          {map.mapName}
                                        </Title>
                                        <Flex
                                          justify="space-between"
                                          align="center"
                                          gap={SmallThenSm ? "sm" : "xl"}
                                        >
                                          <Flex
                                            direction="column"
                                            align="center"
                                            justify="center"
                                          >
                                            <Image
                                              src={`/api/team/logo?id=${match.participants.one.id}`}
                                              alt="league logo"
                                              fit="contain"
                                              h={30}
                                              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                            />
                                            <Text c="red">{map.roundScores[0]?.roundsWon}</Text>
                                          </Flex>
                                          <Flex
                                            direction="column"
                                            align="center"
                                            bg="black"
                                            p="sm"
                                          >
                                            <Text size="sm">Stats</Text>
                                            <Text>
                                              {map.roundScores[0]?.halfScores[0]}:{map.roundScores[1]?.halfScores[0]}
                                              &nbsp;|&nbsp;
                                              {map.roundScores[0]?.halfScores[1]}:{map.roundScores[1]?.halfScores[1]}
                                            </Text>
                                          </Flex>
                                          <Flex direction="column" align="center">
                                            <Image
                                              src={`/api/team/logo?id=${match.participants.two.id}`}
                                              alt="league logo"
                                              fit="contain"
                                              h={30}
                                              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                            />
                                            <Text c="green">{map.roundScores[1]?.roundsWon}</Text>
                                          </Flex>
                                        </Flex>
                                      </Flex>
                                    }

                                    {match.status !== "Scheduled" && sport.alias === "codmwiii" &&
                                      <SimpleGrid cols={{ base: 1, md: 1 }}>
                                        <Title order={5}>
                                          TBA
                                        </Title>
                                        <Divider />
                                        <Text size="sm">Terminal</Text>
                                        <Flex
                                          justify="space-between"
                                          align="center"
                                          gap="xs"
                                        >
                                          <Flex
                                            direction="column"
                                            align="center"
                                            justify="center"
                                          >
                                            <Image
                                              src={`/api/team/logo?id=${match.participants.one.id}`}
                                              alt="league logo"
                                              fit="contain"
                                              h={30}
                                              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                            />
                                            <Text c="red">5</Text>
                                          </Flex>
                                          <Flex
                                            direction="column"
                                            align="center"
                                            bg="black"
                                            p="2"
                                          >
                                            <Text size={SmallThenSm ? "xs" : "sm"}>Stats</Text>
                                          </Flex>
                                          <Flex direction="column" align="center">
                                            <Image
                                              src={`/api/team/logo?id=${match.participants.one.id}`}
                                              alt="league logo"
                                              fit="contain"
                                              h={30}
                                              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                            />
                                            <Text c="green">5</Text>
                                          </Flex>
                                        </Flex>
                                      </SimpleGrid>
                                    }
                                  </div>
                                </Card>
                              </>
                            ))
                          )}
                        </SimpleGrid>
                      </Stack>
                    </Card>
                    {
                      match.status !== "Scheduled" && 
                      (sport.alias === "cs2" || sport.alias === "valorant") &&
                      <Stack mt={SmallThenSm ? "10" : "60"}>
                        <Flex gap="md" px={20}>
                          <Text c="indigo">Maps</Text>
                          <Text c="indigo" ml="auto">
                            Removed
                          </Text>
                          <Text c="indigo">Picked</Text>
                        </Flex>
                        <Card>
                          <Flex align="center" py="xs">
                            <Text>Ancient</Text>
                            <Box miw={100} ta="center" ml="auto">
                              <Image
                                src={`/api/team/logo?id=${match.participants.one.id}`}
                                alt="league logo"
                                fit="contain"
                                h={30}
                                ml="auto"
                                fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                              />
                            </Box>
                            <Box miw={60} ta="center">
                              <Text>-</Text>
                            </Box>
                          </Flex>
                          <Divider />
                          <Flex align="center" py="xs">
                            <Text>Nuke</Text>
                            <Box miw={100} ta="center" ml="auto">
                              <Image
                                src={`/api/team/logo?id=${match.participants.two.id}`}
                                alt="league logo"
                                fit="contain"
                                h={30}
                                ml="auto"
                                fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                              />
                            </Box>
                            <Box miw={60} ta="center">
                              <Text>-</Text>
                            </Box>
                          </Flex>
                          <Divider />
                          <Flex align="center" py="xs">
                            <Text>Vertigo</Text>
                            <Box miw={100} ta="center" ml="auto">
                              <Text>-</Text>
                            </Box>
                            <Box miw={60} ta="center">
                              <Image
                                src={`/api/team/logo?id=${match.participants.one.id}`}
                                alt="league logo"
                                fit="contain"
                                h={30}
                                ml="auto"
                                fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                              />
                            </Box>
                          </Flex>
                          <Divider />
                          <Flex align="center" py="xs">
                            <Text>Mirage</Text>
                            <Box miw={100} ta="center" ml="auto">
                              <Text>-</Text>
                            </Box>
                            <Box miw={60} ta="center">
                              <Image
                                src={`/api/team/logo?id=${match.participants.two.id}`}
                                alt="league logo"
                                fit="contain"
                                h={30}
                                ml="auto"
                                fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                              />
                            </Box>
                          </Flex>
                          <Divider />
                          <Flex align="center" py="xs">
                            <Text>Overpass</Text>
                            <Box miw={100} ta="center" ml="auto">
                              <Text>-</Text>
                            </Box>
                            <Box miw={60} ta="center">
                              <Text>-</Text>
                            </Box>
                          </Flex>
                        </Card>
                        <Text c="indigo" ta="center">Overpass was left Over</Text>
                      </Stack>
                    }
                  </SimpleGrid>
                </FadeUpAni>
              )}

            {match.status !== "Scheduled" && sport.alias !== "lol" && sport.alias !== "dota2" &&(
            <Card p="lg">
              <Title order={BigThenXs ? 4 : 5} tt="uppercase" mb={10}>
                ScoreBoard
              </Title>
              <Stack gap="xl">
                <Flex align="center" justify="space-between">
                  <Stack>
                    <Flex align="center" gap="xs">
                      <Text c="dimmed" size={BigThenXs ? "sm" : "xs"}>
                        R - 21
                      </Text>
                      <Divider orientation="vertical" size="sm" />
                      <Text size={BigThenXs ? "sm" : "xs"}>MIRAGE</Text>
                    </Flex>
                  </Stack>

                  <Flex align="center" gap={rem(5)}>
                    <Title order={BigThenXs ? 4 : 5}>4</Title>
                    <Title order={BigThenXs ? 4 : 5}>:</Title>
                    <Title order={BigThenXs ? 4 : 5}>6</Title>
                  </Flex>

                  <Flex align="center" gap={rem(5)}>
                    <Text size={BigThenXs ? "sm" : "xs"}>1:39</Text>
                    <IconBomb size={BigThenXs ? 20 : 16} />
                  </Flex>
                </Flex>

                {sport.alias !== "valorant" &&
                  sport.alias !== "dota2" &&
                  sport.alias !== "lol" && <MatchStats />}

                <Stack gap="md">
                  <ScoreBoardHead
                    game={sport.alias}
                    teamId={match.participants.one.id!}
                    name={match.participants.one.name!}
                    bg="yellow.5"
                  />
                  {
                    match.participants.one.team?.most_recent_lineup?.map((player, index) => (
                      <ScoreBoardRow
                        key={index}
                        game={sport.alias}
                        name={player.name}
                      />
                    ))
                  }
                  
                  <Space />

                  <ScoreBoardHead
                    game={sport.alias}
                    teamId={match.participants.two.id!}
                    name={match.participants.two.name!}
                    bg="blue.5"
                  />

                  {
                    match.participants.one.team?.most_recent_lineup?.map((player, index) => (
                      <ScoreBoardRow
                        key={index}
                        game={sport.alias}
                        name={player.name}
                      />
                    ))
                  }
                </Stack>
              </Stack>
            </Card> )}

            {match.status !== "Scheduled" && sport.alias !== "cs2" && sport.alias !== "rl" && sport.alias !== "val" && sport.alias !== "codmwiii" && (
            <Card p="lg">
              <Stack gap="xl">
                <SimpleGrid cols={{base: 1, md: 2}} spacing="lg">
                  
                  <Stack>
                    <ScoreBoardHead
                      game={sport.alias}
                      teamId={match.participants.one.id!}
                      name={match.participants.one.name!}
                      bg="yellow.5"
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.one.name!}
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.one.name!}
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.one.name!}
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.one.name!}
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.one.name!}
                    />
                  </Stack>
                  
                  <Stack>
                    <ScoreBoardHead
                      game={sport.alias}
                      teamId={match.participants.two.id!}
                      name={match.participants.two.name!}
                      bg="blue.5"
                    />
  
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.two.name!}
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.two.name!}
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.two.name!}
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.two.name!}
                    />
                    <ScoreBoardRow
                      game={sport.alias}
                      name={match.participants.two.name!}
                    />
                  </Stack>

                </SimpleGrid>
              </Stack>
            </Card> )}

            <FadeUpAni>
              <Grid columns={10}>
                <Grid.Col span={{ base: 10, md: 7 }}>
                  <Card p="xs">
                    <Stack>
                      <Group>
                        <Image
                          src={`/api/team/logo?id=${match.participants.one.id}`}
                          alt="league logo"
                          fit="contain"
                          h={30}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                        <Title order={5} tt="uppercase">
                          Lineups
                        </Title>
                      </Group>

                      {match.participants.one.team?.most_recent_lineup ? (
                        <SimpleGrid spacing={5} cols={teamLength}>
                          {Children.toArray(
                            match.participants.one.team?.most_recent_lineup.map(
                              (player) => (
                                <>
                                  <PlayerCard {...player} />
                                </>
                              )
                            )
                          )}
                        </SimpleGrid>
                      ) : (
                        <>
                          <SimpleGrid spacing={5} cols={5}>
                            {Array.from(Array(5)).map(() => (
                              <>
                                <PlayerCard id={0} name="Unknown" />
                              </>
                            ))}
                          </SimpleGrid>
                        </>
                      )}

                      <Group>
                        <Image
                          src={`/api/team/logo?id=${match.participants.two.id}`}
                          alt="league logo"
                          fit="contain"
                          h={30}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                        <Title order={5} tt="uppercase">
                          Lineups
                        </Title>
                      </Group>

                      {match.participants.two.team?.most_recent_lineup ? (
                        <SimpleGrid spacing={5} cols={teamLength}>
                          {Children.toArray(
                            match.participants.two.team?.most_recent_lineup.map(
                              (player) => (
                                <>
                                  <PlayerCard {...player} />
                                </>
                              )
                            )
                          )}
                        </SimpleGrid>
                      ) : (
                        <>
                          <SimpleGrid spacing={5} cols={5}>
                            {Array.from(Array(5)).map(() => (
                              <>
                                <PlayerCard id={0} name="Unknown" />
                              </>
                            ))}
                          </SimpleGrid>
                        </>
                      )}
                    </Stack>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 10, md: 3 }}>
                  <Stack mt={10}>
                    <Title order={5} tt="uppercase">
                      Match History
                    </Title>

                    {/* <SegmentedControl
                      maw={200}
                      size="xs"
                      color="blue"
                      radius="xl"
                      styles={{
                        root: {
                          background: "transparent",
                          border: "1px solid var(--mantine-color-dimmed)",
                        },
                      }}
                      data={[
                        {
                          value: "core",
                          label: (
                            <>
                              <Text size="sm" my={3} fw="bold" mx="md">
                                Core
                              </Text>
                            </>
                          ),
                        },
                        {
                          value: "team",
                          label: (
                            <>
                              <Text size="sm" my={3} fw="bold" mx="md">
                                Team
                              </Text>
                            </>
                          ),
                        },
                      ]}
                    /> */}

                    <Card>
                      <Stack>
                        <Group>
                          <Image
                            src={`/api/team/logo?id=${match.participants.one.id}`}
                            alt="league logo"
                            fit="contain"
                            h={25}
                            fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                          />

                          <Text>{match.participants.one.name ?? "Unknown"}</Text>
                        </Group>
                        <Divider />

                        {
                          match.fmh?.fixtures?.length &&
                          match.fmh.fixtures.length > 0 &&
                          <>{
                            match.fmh.fixtures.map((fixture) => (
                              <Group justify="space-between">
                                {fixture.opponentName ?? "Unknown"}
                                <Badge color="red" variant="light" c="white">
                                  BO{fixture.score + fixture.opponentScore} {fixture.score}-{fixture.opponentScore}
                                </Badge>
                              </Group>
                            ))
                          }</>
                        }
                        {
                          !match.fmh?.fixtures?.length &&
                          <Text>No History</Text>
                        }
                      </Stack>
                    </Card>

                    <Card>
                      <Stack>
                        <Group>
                          <Image
                            src={`/api/team/logo?id=${match.participants.two.id}`}
                            alt="league logo"
                            fit="contain"
                            h={25}
                            fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                          />

                          <Text>{match.participants.two.name ?? "Unknown"}</Text>
                        </Group>
                        <Divider />

                        {
                          match.tmh?.fixtures?.length &&
                          match.tmh.fixtures.length > 0 &&
                          <>{
                            match.tmh.fixtures.map((fixture) => (
                              <Group justify="space-between">
                                {fixture.opponentName ?? "Unknown"}
                                <Badge color="red" variant="light" c="white">
                                  BO{fixture.score + fixture.opponentScore} {fixture.score}-{fixture.opponentScore}
                                </Badge>
                              </Group>
                            ))
                          }</>
                        }
                        {
                          !match.tmh?.fixtures?.length &&
                          <Text>No History</Text>
                        }
                      </Stack>
                    </Card>
                  </Stack>
                </Grid.Col>
              </Grid>
            </FadeUpAni>

            {sport.alias !== "lol" &&
              sport.alias !== "dota2" &&
              sport.alias !== "rl" &&
              sport.alias !== "codmwiii" &&
              match.status !== "Ended" && (
                <FadeUpAni>
                  <Grid columns={10}>
                    <Grid.Col span={BigThenXs ? 7 : 10}>
                      <Card p={BigThenXs ? 'lg' : 'xs'} bg="transparent">
                        <Stack>
                          <Grid columns={10}>
                            <Grid.Col p={BigThenXs ? 20 : 20} span={5}>
                              <Title order={5} tt="uppercase">
                                Maps Status
                              </Title>
                            </Grid.Col>

                            <Grid.Col span={5}>
                              <Group justify="end">
                                <Card
                                  withBorder
                                  p="xs"
                                  radius="xl"
                                  py={BigThenXs ? 5 : 2}
                                  bg="transparent"
                                  style={{
                                    borderColor: "var(--mantine-color-red-4)",
                                  }}
                                >
                                  <Group gap="xs">
                                    <Image
                                      src={`/api/team/logo?id=${match.participants.one.id}`}
                                      alt="league logo"
                                      fit="contain"
                                      h={20}
                                      fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                    />
                                    <Text
                                      size="xs"
                                      fw="bold"
                                      visibleFrom="sm"
                                      truncate="end"
                                      maw={100}
                                    >
                                      {match.participants.one.team?.name}
                                    </Text>
                                  </Group>
                                </Card>

                                <Card
                                  withBorder
                                  p="xs"
                                  radius="xl"
                                  py={BigThenXs ? 5 : 2}
                                  bg="transparent"
                                  style={{
                                    borderColor: "var(--mantine-color-green-4)",
                                  }}
                                >
                                  <Group gap="xs">
                                    <Image
                                      src={`/api/team/logo?id=${match.participants.two.id}`}
                                      alt="league logo"
                                      fit="contain"
                                      h={20}
                                      fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                    />
                                    <Text
                                      size="xs"
                                      fw="bold"
                                      visibleFrom="sm"
                                      truncate="end"
                                      maw={100}
                                    >
                                      {match.participants.two.team?.name}
                                    </Text>
                                  </Group>
                                </Card>
                              </Group>
                            </Grid.Col>
                          </Grid>

                          <Divider size="sm" />

                          {Children.toArray(
                            Array.from(Array(5)).map(() => (
                              <Grid columns={10}>
                                <Grid.Col
                                  span={{ base: 3, sm: 5 }}
                                  m="auto"
                                  h="100%"
                                >
                                  <Card
                                    h="100%"
                                    style={{
                                      backgroundImage: SmallThenSm
                                        ? "none"
                                        : "url(/map.jpg)",
                                    }}
                                  >
                                    <Overlay
                                      style={{
                                        zIndex: 1,
                                      }}
                                    />
                                    <div
                                      style={{
                                        zIndex: 2,
                                      }}
                                    >
                                      <Title
                                        order={SmallThenSm ? 5 : 1}
                                        ta="center"
                                      >
                                        TBA
                                      </Title>
                                    </div>
                                  </Card>
                                </Grid.Col>

                                <Grid.Col span={{ base: 7, sm: 5 }} m="auto">
                                  <Card>
                                    <Group justify="space-between">
                                      <Group gap={0}>
                                        <Badge
                                          size="xs"
                                          visibleFrom="sm"
                                          color="green"
                                          style={{
                                            transform: "rotate(90deg)",
                                          }}
                                        >
                                          Pick
                                        </Badge>
                                        <Stack gap={5}>
                                          <Group gap="sm" align="center">
                                            <Title order={SmallThenSm ? 5 : 3}>
                                              100%&nbsp;
                                            </Title>
                                            <Badge
                                              color="green"
                                              c="white"
                                              size="xs"
                                            >
                                              Pick
                                            </Badge>
                                          </Group>
                                          <Text size="xs" c="dimmed">
                                            11 maps
                                          </Text>
                                        </Stack>
                                      </Group>

                                      <Stack gap={5}>
                                        <Title order={SmallThenSm ? 5 : 3}>
                                          50%
                                        </Title>

                                        <Text size="xs" c="dimmed">
                                          4 maps
                                        </Text>
                                      </Stack>
                                    </Group>
                                  </Card>
                                </Grid.Col>
                              </Grid>
                            ))
                          )}
                        </Stack>
                      </Card>
                    </Grid.Col>
                  </Grid>
                </FadeUpAni>
              )}

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
                          src={`/api/team/logo?id=${match.participants.one.id}`}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 50 : 15}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />

                        <Text size={BigThenXs ? "md" : rem(8)}>
                          {match.participants.one.name ?? "Unknown"}
                        </Text>
                      </Flex>

                      <Stack gap={0}>
                        <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                          6
                        </Text>
                        <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                          Wins
                        </Text>
                      </Stack>

                      <Stack gap={0}>
                        <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                          6
                        </Text>
                        <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                          Overview
                        </Text>
                      </Stack>

                      <Stack gap={0}>
                        <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                          6
                        </Text>
                        <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                          Wins
                        </Text>
                      </Stack>

                      <Flex align="center" gap={BigThenXs ? "md" : rem(5)}>
                        <Text size={BigThenXs ? "md" : rem(8)}>
                          {match.participants.two.name ?? "Unknown"}
                        </Text>

                        <Image
                          src={`/api/team/logo?id=${match.participants.two.id}`}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 50 : 15}
                          fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                        />
                      </Flex>
                    </Flex>
                  </Card>

                  <Stack gap={0}>
                    {
                      match.hth?.fixtures?.length &&
                      match.hth.fixtures.length > 0 &&
                      match.hth.fixtures.map((data, dindex) => (
                        <>
                          <Paper
                            bg={
                              dindex % 2 === 0 ? "transparent" : "dark.5"
                            }
                            radius="sm"
                            px={BigThenXs ? "xl" : "xs"}
                            py="xs"
                          >
                            <Flex justify="space-between" align="center">
                              <Group>
                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  {moment(data.fixtureTime / 1000).format("DD/MM/YYYY")}
                                </Text>

                                <Divider
                                  orientation="vertical"
                                  size="sm"
                                />

                                <Image
                                  src={`/api/team/logo?id=${match.participants.one.id}`}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                  fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    {match.participants.one.name}
                                  </Text>
                                )}

                                <Image
                                  src={`/api/team/logo?id=${match.participants.two.id}`}
                                  alt="league logo"
                                  fit="contain"
                                  h={20}
                                  fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    {match.participants.two.name}
                                  </Text>
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
                                  {data.name}
                                </Text>
                              </Group>

                              <Group gap={SmallThenSm ? rem(7) : "md"}>
                                {sport.alias !== "lol" && (
                                  <>
                                    <Text
                                      size={BigThenXs ? "sm" : rem(8)}
                                      hiddenFrom="sm"
                                    >
                                      {data.name}
                                    </Text>
                                    <Text
                                      size={BigThenXs ? "sm" : rem(8)}
                                      tt="uppercase"
                                      c="dimmed"
                                    >
                                      {data.map}
                                    </Text>

                                    <Divider
                                      orientation="vertical"
                                      size="sm"
                                    />
                                  </>
                                )}

                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  <Text inherit span c="red">
                                    {data.score.one}
                                  </Text>{" "}
                                  -{" "}
                                  <Text inherit span c="green">
                                    {data.score.two}
                                  </Text>
                                </Text>
                              </Group>
                            </Flex>
                          </Paper>
                        </>
                      ))
                    }
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
