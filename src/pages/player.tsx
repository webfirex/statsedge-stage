// import dynamic from "next/dynamic";
import {
  // Badge,
  Image,
  Box,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Space,
  Stack,
  Text,
  Title,
  Select,
  Slider,
} from "@mantine/core";
import { FadeUpAni } from "~/components/animation/fade-up";
import { LayoutComp } from "~/components/layout";
// import { LogoIcon, LogoIconSm } from "~/components/logo/icon";
import { SportSelector } from "~/components/player-page/sports";
import { PathDisplay } from "~/components/pathdisplay";
import { SportInfo } from "~/lib/functions";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { AdBanner } from "~/components/player-page/ad-banner";
import { PlayerImg } from "~/components/player-page/player-pic";
import { PlayerDetails } from "~/components/player-page/player-details";
import { Achievements } from "~/components/player-page/achievements";
import { RoleRow } from "~/components/player-page/role-row";
import MainFilters from "~/components/player-page/main-filter";
import { BarChart, LineChart } from '@mantine/charts';
import { data } from '~/pages/api/charts/vbar';
import { performance } from "./api/charts/perform-chart";
import OverallStats from "~/components/player-page/overall-stats";
import MatchStats from "~/components/player-page/match-stats";
import PlayerMatchHistory from "~/components/player-page/match-history";
import HitRate from "~/components/player-page/hit-rate";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState(50);

  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`)
  
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
  
  // const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack gap="sm">
            
            <FadeUpAni>
              <SportSelector
                sport={sport}
                disabled
                setSport={(sport) => {
                  console.log(sport);
                }}
              />
            </FadeUpAni>

            <FadeUpAni>
                <AdBanner />
            </FadeUpAni>

            <FadeUpAni>
              <PathDisplay
                path={[
                  {
                    text: `Player Profile`,
                    link: `/player`,
                  }
                ]}
              />
            </FadeUpAni>

            <FadeUpAni>
            <Grid columns={10}>
              <Grid.Col span={{ base: 10, md: 4 }}>
                <PlayerImg />
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 6 }}>

                <Box display={"flex"} style={{
                  justifyContent: "space-between",
                  flexDirection: BigThenMd ? "row" : "column",
                }}>
                  <PlayerDetails />
                  <Achievements />
                </Box>

                <RoleRow />

                <BarChart
                  display={BigThenMd ? "block" : "none"}
                  h={300}
                  maw={500}
                  data={data}
                  dataKey="key"
                  type="stacked"
                  orientation="vertical"
                  yAxisProps={{ width: 80, }}
                  mt={"lg"}
                  gridAxis="none"
                  withTooltip={false}
                  referenceLines={[
                    {
                      x: 100,
                      color: 'white',
                    },
                  ]}
                  series={[
                    { name: 'Laptops', color: 'blue.6' },
                  ]}
                />

              </Grid.Col>
            </Grid>
            </FadeUpAni>

            <Space />
            
            <MainFilters />

            <Space />

            <Grid columns={10}>
              <Grid.Col span={{ base: 10, md: 7 }}>
                <FadeUpAni>
                <HitRate />
                </FadeUpAni>
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 3 }}>
                <FadeUpAni>
                <Flex gap={"15px"} justify={"space-between"}>
                  <Flex gap={"10px"} direction={"column"} align={"center"} w={"100%"}>
                    <Text fz={"md"} fw={"bold"} c={"blue"}>VS</Text>
                    <Text fz={"xs"}>18.5</Text>
                    <Box bg={"green"} style={{ padding: "10px 25px", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }} w={"90%"}>
                      <Text fz={"xs"}>18.5</Text>
                      <Text fz={"xs"}>18.5</Text>
                    </Box>
                  </Flex>
                  <Flex gap={"10px"} direction={"column"} align={"center"} w={"100%"}>
                    <Text fz={"md"} fw={"bold"} c={"blue"}>L10</Text>
                    <Text fz={"xs"}>18.5</Text>
                    <Box bg={"red"} style={{ padding: "10px 25px", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }} w={"90%"}>
                      <Text fz={"xs"}>18.5</Text>
                      <Text fz={"xs"}>18.5</Text>
                    </Box>
                  </Flex>
                  <Flex gap={"10px"} direction={"column"} align={"center"} w={"100%"}>
                    <Text fz={"md"} fw={"bold"} c={"blue"}>L5</Text>
                    <Text fz={"xs"}>18.5</Text>
                    <Box bg={"green"} style={{ padding: "10px 25px", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center" }} w={"90%"}>
                      <Text fz={"xs"}>18.5</Text>
                      <Text fz={"xs"}>18.5</Text>
                    </Box>
                  </Flex>
                </Flex>
                </FadeUpAni>

                <FadeUpAni>
                  <Flex w={"100%"} gap={"md"} mt={"lg"} justify={"center"} align={"center"} direction={"column"}>
                    <Text w={"100%"} fz={"md"} ta={"center"}>Line</Text>
                    <Box w={"100%"} bg={"blue"} style={{ borderRadius: "15px" }}>
                      <Card w={"100%"} display={"flex"} style={{ gap: "10px",  justifyContent:"center", flexDirection: "row", padding: "20px 10px" }}>
                          <Text size="sm" w={"15%"} ta={"center"}>
                            <b>{value}</b>
                          </Text>
                          <Slider label={null} size={"sm"} thumbSize={"15px"} w={"85%"} value={value} onChange={setValue} />
                      </Card>
                      <Text w={"100%"} p={"sm"} ta={"center"}>Line: 18.5 - 8/10 (80%)</Text>
                    </Box>
                  </Flex>
                </FadeUpAni>

                <FadeUpAni>
                  <Box bg={"#161515"} mt={"lg"} style={{ borderRadius: "20px" }}>
                    <Flex justify={"space-between"} bg={"#101010"} style={{ borderBottom: "1px solid #1d1d1d", borderTopLeftRadius: "20px", borderTopRighttRadius: "20px", }} p={"md"}>
                      <Text fz={"sm"}><b>Next Match:</b></Text>
                      <Text fz={"xs"}>6:00pm 15th January, 2024</Text>
                    </Flex>
                    <Flex direction={"column"} p={"sm"} gap={"sm"}>
                      <Flex justify={"space-between"} align={"center"}>
                        <Box display={"flex"} style={{ gap: "15px" }}>
                          <Image
                            src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                          />
                          <Text fz={"sm"}>Team Name</Text>
                        </Box>
                        <Box display={"flex"} style={{ gap: "10px", border: "1px solid #1d1d1d", padding: "5px", borderRadius: "5px" }} bg={"#071225"}>
                          <Image
                            src={"/icon-2.png"}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                          />
                          <Text fz={"sm"}>+250</Text>
                        </Box>
                      </Flex>
                      <Flex justify={"space-between"} align={"center"}>
                        <Box display={"flex"} style={{ gap: "15px" }}>
                          <Image
                            src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                          />
                          <Text fz={"sm"}>Team Name</Text>
                        </Box>
                        <Box display={"flex"} style={{ gap: "10px", border: "1px solid #1d1d1d", padding: "5px", borderRadius: "5px" }} bg={"#071225"}>
                          <Image
                            src={"/icon-2.png"}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                          />
                          <Text fz={"sm"}>+250</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </FadeUpAni>

              </Grid.Col>
            </Grid>

            <Space />

            <Grid columns={10} mt={"md"}>
              <Grid.Col span={{ base: 10, md: 5 }}>
                <FadeUpAni>
                <OverallStats />
                </FadeUpAni>
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 5 }}>
                <FadeUpAni>
                <MatchStats />
                </FadeUpAni>
                <FadeUpAni>
                <Card p={"20px"} mt={"md"}>
                  <Title order={4} tt={"uppercase"} pb={"md"}>Performance Chart</Title>
                  <LineChart
                    h={300}
                    data={performance}
                    dataKey="key"
                    series={[
                      { name: 'Apples', color: 'blue.6' },
                    ]}
                    curveType="natural"
                    gridAxis="xy"
                  />
                </Card>
                </FadeUpAni>
              </Grid.Col>
            </Grid>

            <FadeUpAni>
              <PlayerMatchHistory />
            </FadeUpAni>

          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
