// import dynamic from "next/dynamic";
import {
  // Badge,
  Image,
  Box,
  Card,
  Table,
  Center,
  Container,
  Flex,
  Grid,
  Space,
  Stack,
  Text,
  Title,
  Select,
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

export default function () {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)
  
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

            {/* <Grid columns={10}>
              <Grid.Col span={{ base: 10, md: 7 }}>
                <Card p={"20px"} style={{ backgroundImage: "url(/map-blur.png)" }}>
                  <Flex justify={"space-between"}>
                    <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                    </Box>
                  </Flex>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 3 }}></Grid.Col>
            </Grid> */}

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
