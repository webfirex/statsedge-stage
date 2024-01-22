// import dynamic from "next/dynamic";
'use client'
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
  rem,
  Paper,
  Group,
  Divider,
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
import { CircleFlag } from "react-circle-flags";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TeamDetails } from "~/components/team-page/team-details";

export default function App() {
  const [value, setValue] = useState(50);

  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`)
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`)
  
  const searchParams = useSearchParams();
 
  let sportQ = searchParams.get('m')?.toString();

  if (sportQ === undefined) {
    sportQ = 'lol';
  }
  
    const sport = SportInfo(sportQ);

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
            
            {/* <FadeUpAni>
              <SportSelector
                sport={sport}
                disabled
                setSport={(sport) => {
                  console.log(sport);
                }}
              />
            </FadeUpAni> */}

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
                <TeamDetails sport={SportInfo(sportQ)?.name} logo={SportInfo(sportQ)?.logo} ></TeamDetails>
            </FadeUpAni>

            <FadeUpAni>
                <Card p={BigThenMd ? "20px" : "8px"}>
                    <Grid columns={10} gutter={BigThenMd ? "sm" : "5px"}>
                        <Grid.Col span={{ base: 2, md: 2 }}>
                            <Card bg={"#232323"} display={"flex"} style={{
                                flexDirection: "column",
                                gap: "5px",
                                justifyContent: "center",
                                alignContent: "center",
                                padding: "0",
                            }}>
                                <Flex justify={"center"} align={"center"} direction={"column"} p={BigThenMd ? "15px" : "5px"}>
                                    <Image
                                    src={"/playerimg.png"}
                                    alt="Player Img"
                                    style={{
                                        borderRadius: BigThenMd ? "50px" : "5px",
                                        width: BigThenMd ? "50px" : "100%",
                                        height: BigThenMd ? "50px" : "auto",
                                    }}
                                    />
                                    <Text fz={BigThenMd ? "xs" : "8px"} ta={"center"} tt={"uppercase"} mt={"10px"}>Player</Text>
                                    <Text fz={BigThenMd ? "xs" : "7px"} ta={"center"} tt={"uppercase"} opacity={"0.6"}>Player Name</Text>
                                    <Flex mt={"5px"} justify={"center"} align={"center"} gap={"xs"} display={BigThenMd ? "flex" : "none"}>
                                        <CircleFlag countryCode="us" height={BigThenXs ? 15 : 10} />
                                        <Text fz={"xs"} ta={"center"}>United States</Text>
                                    </Flex>
                                </Flex>
                                <Flex p={"15px 10px"} direction={"column"} gap={"5px"} bg={"#101010"} display={BigThenMd ? "flex" : "none"}>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>K/D  1.31</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Most Played Champion :  AATROX</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Role  TOP</Text>
                                </Flex>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 2, md: 2 }}>
                            <Card bg={"#232323"} display={"flex"} style={{
                                flexDirection: "column",
                                gap: "5px",
                                justifyContent: "center",
                                alignContent: "center",
                                padding: "0",
                            }}>
                                <Flex justify={"center"} align={"center"} direction={"column"} p={BigThenMd ? "15px" : "5px"}>
                                    <Image
                                    src={"/playerimg.png"}
                                    alt="Player Img"
                                    style={{
                                        borderRadius: BigThenMd ? "50px" : "5px",
                                        width: BigThenMd ? "50px" : "100%",
                                        height: BigThenMd ? "50px" : "auto",
                                    }}
                                    />
                                    <Text fz={BigThenMd ? "xs" : "8px"} ta={"center"} tt={"uppercase"} mt={"10px"}>Player</Text>
                                    <Text fz={BigThenMd ? "xs" : "7px"} ta={"center"} tt={"uppercase"} opacity={"0.6"}>Player Name</Text>
                                    <Flex mt={"5px"} justify={"center"} align={"center"} gap={"xs"} display={BigThenMd ? "flex" : "none"}>
                                        <CircleFlag countryCode="us" height={BigThenXs ? 15 : 10} />
                                        <Text fz={"xs"} ta={"center"}>United States</Text>
                                    </Flex>
                                </Flex>
                                <Flex p={"15px 10px"} direction={"column"} gap={"5px"} bg={"#101010"} display={BigThenMd ? "flex" : "none"}>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>K/D  1.31</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Most Played Champion :  AATROX</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Role  TOP</Text>
                                </Flex>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 2, md: 2 }}>
                            <Card bg={"#232323"} display={"flex"} style={{
                                flexDirection: "column",
                                gap: "5px",
                                justifyContent: "center",
                                alignContent: "center",
                                padding: "0",
                            }}>
                                <Flex justify={"center"} align={"center"} direction={"column"} p={BigThenMd ? "15px" : "5px"}>
                                    <Image
                                    src={"/playerimg.png"}
                                    alt="Player Img"
                                    style={{
                                        borderRadius: BigThenMd ? "50px" : "5px",
                                        width: BigThenMd ? "50px" : "100%",
                                        height: BigThenMd ? "50px" : "auto",
                                    }}
                                    />
                                    <Text fz={BigThenMd ? "xs" : "8px"} ta={"center"} tt={"uppercase"} mt={"10px"}>Player</Text>
                                    <Text fz={BigThenMd ? "xs" : "7px"} ta={"center"} tt={"uppercase"} opacity={"0.6"}>Player Name</Text>
                                    <Flex mt={"5px"} justify={"center"} align={"center"} gap={"xs"} display={BigThenMd ? "flex" : "none"}>
                                        <CircleFlag countryCode="us" height={BigThenXs ? 15 : 10} />
                                        <Text fz={"xs"} ta={"center"}>United States</Text>
                                    </Flex>
                                </Flex>
                                <Flex p={"15px 10px"} direction={"column"} gap={"5px"} bg={"#101010"} display={BigThenMd ? "flex" : "none"}>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>K/D  1.31</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Most Played Champion :  AATROX</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Role  TOP</Text>
                                </Flex>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 2, md: 2 }}>
                            <Card bg={"#232323"} display={"flex"} style={{
                                flexDirection: "column",
                                gap: "5px",
                                justifyContent: "center",
                                alignContent: "center",
                                padding: "0",
                            }}>
                                <Flex justify={"center"} align={"center"} direction={"column"} p={BigThenMd ? "15px" : "5px"}>
                                    <Image
                                    src={"/playerimg.png"}
                                    alt="Player Img"
                                    style={{
                                        borderRadius: BigThenMd ? "50px" : "5px",
                                        width: BigThenMd ? "50px" : "100%",
                                        height: BigThenMd ? "50px" : "auto",
                                    }}
                                    />
                                    <Text fz={BigThenMd ? "xs" : "8px"} ta={"center"} tt={"uppercase"} mt={"10px"}>Player</Text>
                                    <Text fz={BigThenMd ? "xs" : "7px"} ta={"center"} tt={"uppercase"} opacity={"0.6"}>Player Name</Text>
                                    <Flex mt={"5px"} justify={"center"} align={"center"} gap={"xs"} display={BigThenMd ? "flex" : "none"}>
                                        <CircleFlag countryCode="us" height={BigThenXs ? 15 : 10} />
                                        <Text fz={"xs"} ta={"center"}>United States</Text>
                                    </Flex>
                                </Flex>
                                <Flex p={"15px 10px"} direction={"column"} gap={"5px"} bg={"#101010"} display={BigThenMd ? "flex" : "none"}>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>K/D  1.31</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Most Played Champion :  AATROX</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Role  TOP</Text>
                                </Flex>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 2, md: 2 }}>
                            <Card bg={"#232323"} display={"flex"} style={{
                                flexDirection: "column",
                                gap: "5px",
                                justifyContent: "center",
                                alignContent: "center",
                                padding: "0",
                            }}>
                                <Flex justify={"center"} align={"center"} direction={"column"} p={BigThenMd ? "15px" : "5px"}>
                                    <Image
                                    src={"/playerimg.png"}
                                    alt="Player Img"
                                    style={{
                                        borderRadius: BigThenMd ? "50px" : "5px",
                                        width: BigThenMd ? "50px" : "100%",
                                        height: BigThenMd ? "50px" : "auto",
                                    }}
                                    />
                                    <Text fz={BigThenMd ? "xs" : "8px"} ta={"center"} tt={"uppercase"} mt={"10px"}>Player</Text>
                                    <Text fz={BigThenMd ? "xs" : "7px"} ta={"center"} tt={"uppercase"} opacity={"0.6"}>Player Name</Text>
                                    <Flex mt={"5px"} justify={"center"} align={"center"} gap={"xs"} display={BigThenMd ? "flex" : "none"}>
                                        <CircleFlag countryCode="us" height={BigThenXs ? 15 : 10} />
                                        <Text fz={"xs"} ta={"center"}>United States</Text>
                                    </Flex>
                                </Flex>
                                <Flex p={"15px 10px"} direction={"column"} gap={"5px"} bg={"#101010"} display={BigThenMd ? "flex" : "none"}>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>K/D  1.31</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Most Played Champion :  AATROX</Text>
                                    <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>Role  TOP</Text>
                                </Flex>
                            </Card>
                        </Grid.Col>
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
                          src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 50 : 15}
                        />

                        <Text size={BigThenXs ? "md" : rem(8)}>
                          Team 1
                        </Text>
                      </Flex>

                      <Stack gap={0}>
                        <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                          0
                        </Text>
                        <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                          Wins
                        </Text>
                      </Stack>

                      <Stack gap={0}>
                        <Text size={BigThenXs ? "sm" : rem(10)} ta="center">
                          0
                        </Text>
                        <Text size={BigThenXs ? "sm" : rem(8)} ta="center">
                          Overview
                        </Text>
                      </Stack>

                    </Flex>
                  </Card>

                  <Stack gap={0}>
                          <Paper
                            bg={"transparent"}
                            radius="sm"
                            px={BigThenXs ? "xl" : "xs"}
                            py="xs"
                          >
                            <Flex justify="space-between" align="center">
                              <Group>
                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  18/01/2023
                                </Text>

                                <Divider orientation="vertical" size="sm" />

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 1
                                  </Text>
                                )}

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 2
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
                                  <Text inherit span c="red">
                                    0
                                  </Text>{" "}
                                  -{" "}
                                  <Text inherit span c="green">
                                    0
                                  </Text>
                                </Text>
                              </Group>
                            </Flex>
                          </Paper>
                          <Paper
                            bg={"dark.5"}
                            radius="sm"
                            px={BigThenXs ? "xl" : "xs"}
                            py="xs"
                          >
                            <Flex justify="space-between" align="center">
                              <Group>
                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  18/01/2023
                                </Text>

                                <Divider orientation="vertical" size="sm" />

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 1
                                  </Text>
                                )}

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 2
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
                                  <Text inherit span c="red">
                                    0
                                  </Text>{" "}
                                  -{" "}
                                  <Text inherit span c="green">
                                    0
                                  </Text>
                                </Text>
                              </Group>
                            </Flex>
                          </Paper>
                          <Paper
                            bg={"transparent"}
                            radius="sm"
                            px={BigThenXs ? "xl" : "xs"}
                            py="xs"
                          >
                            <Flex justify="space-between" align="center">
                              <Group>
                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  18/01/2023
                                </Text>

                                <Divider orientation="vertical" size="sm" />

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 1
                                  </Text>
                                )}

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 2
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
                                  <Text inherit span c="red">
                                    0
                                  </Text>{" "}
                                  -{" "}
                                  <Text inherit span c="green">
                                    0
                                  </Text>
                                </Text>
                              </Group>
                            </Flex>
                          </Paper>
                          <Paper
                            bg={"dark.5"}
                            radius="sm"
                            px={BigThenXs ? "xl" : "xs"}
                            py="xs"
                          >
                            <Flex justify="space-between" align="center">
                              <Group>
                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  18/01/2023
                                </Text>

                                <Divider orientation="vertical" size="sm" />

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 1
                                  </Text>
                                )}

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 2
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
                                  <Text inherit span c="red">
                                    0
                                  </Text>{" "}
                                  -{" "}
                                  <Text inherit span c="green">
                                    0
                                  </Text>
                                </Text>
                              </Group>
                            </Flex>
                          </Paper>
                          <Paper
                            bg={"transparent"}
                            radius="sm"
                            px={BigThenXs ? "xl" : "xs"}
                            py="xs"
                          >
                            <Flex justify="space-between" align="center">
                              <Group>
                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  18/01/2023
                                </Text>

                                <Divider orientation="vertical" size="sm" />

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 1
                                  </Text>
                                )}

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 2
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
                                  <Text inherit span c="red">
                                    0
                                  </Text>{" "}
                                  -{" "}
                                  <Text inherit span c="green">
                                    0
                                  </Text>
                                </Text>
                              </Group>
                            </Flex>
                          </Paper>
                          <Paper
                            bg={"dark.5"}
                            radius="sm"
                            px={BigThenXs ? "xl" : "xs"}
                            py="xs"
                          >
                            <Flex justify="space-between" align="center">
                              <Group>
                                <Text size={BigThenXs ? "sm" : rem(10)}>
                                  18/01/2023
                                </Text>

                                <Divider orientation="vertical" size="sm" />

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 1
                                  </Text>
                                )}

                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 10}
                                />

                                {BigThenXs && (
                                  <Text size="sm">
                                    Team 2
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
                                  <Text inherit span c="red">
                                    0
                                  </Text>{" "}
                                  -{" "}
                                  <Text inherit span c="green">
                                    0
                                  </Text>
                                </Text>
                              </Group>
                            </Flex>
                          </Paper>
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
