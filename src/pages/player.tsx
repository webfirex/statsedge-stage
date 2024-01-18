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
import { elements } from "./api/charts/match-history";
import { performance } from "./api/charts/perform-chart";
import OverallStats from "~/components/player-page/overall-stats";
import MatchStats from "~/components/player-page/match-stats";

export default function () {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const rows = elements.map((element) => (
    <Table.Tr key={element.date}>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td display={BigThenMd ? "block" : "none"}>
        <Flex>
        <Image
          src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
          alt="league logo"
          fit="contain"
          h={BigThenXs ? 20 : 15}
        />{element.team}
        </Flex>
      </Table.Td>
      <Table.Td>
        <Flex display={BigThenMd ? "flex" : "none"}>
          <Image
            src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
            alt="league logo"
            fit="contain"
            h={BigThenXs ? 20 : 15}
          />{element.opponent}
        </Flex>
        <Flex display={BigThenMd ? "none" : "flex"}>
          <Image
            src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
            alt="league logo"
            fit="contain"
            h={BigThenXs ? 20 : 15}
          />
        </Flex>
      </Table.Td>
      <Table.Td>{element.map}</Table.Td>
      <Table.Td>{element.kills}</Table.Td>
      <Table.Td>{element.headshots}</Table.Td>
      <Table.Td>{element.kills}</Table.Td>
      <Table.Td>{element.assists}</Table.Td>
    </Table.Tr>
  ));

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
              <Card display={"flex"} flex={"column"} style={{ gap: "20px" }}>  
                <Flex gap={"lg"} wrap={"wrap"} align={"center"} pl={"20px"}>
                  <Title order={4}>MATCH HISTORY</Title>
                  <Flex gap={"xs"} align={"center"} display={BigThenMd ? "flex" : "none"}>
                    <Flex gap={"xs"} align={"baseline"}>
                      <Text fz={"md"}>
                        Rows
                      </Text>
                      <Select
                        mt="md"
                        comboboxProps={{ withinPortal: true }}
                        data={['React', 'Angular', 'Svelte', 'Vue']}
                        placeholder="Rows"
                        radius={"lg"}
                        // classNames={classes}
                      />
                    </Flex>
                    <Flex gap={"xs"} align={"baseline"}>
                      <Text fz={"md"}>
                        Maps
                      </Text>
                      <Select
                        mt="md"
                        comboboxProps={{ withinPortal: true }}
                        data={['React', 'Angular', 'Svelte', 'Vue']}
                        placeholder="All Maps"
                        radius={"lg"}
                        // classNames={classes}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                
                <Table.ScrollContainer minWidth={500} bg={"#1d1d1d"} style={{ borderRadius: "15px", display: BigThenMd ? "block" : "none" }}>
                  <Table striped highlightOnHover  horizontalSpacing="sm" verticalSpacing="sm">
                    <Table.Thead>
                      <Table.Tr bg={"#101010"} color="#005BBF">
                        <Table.Th color="#005BBF">Date</Table.Th>
                        <Table.Th color="#005BBF" display={BigThenMd ? "block" : "none"}>Player Team</Table.Th>
                        <Table.Th color="#005BBF">Opponent</Table.Th>
                        <Table.Th color="#005BBF">Map</Table.Th>
                        <Table.Th color="#005BBF">Kills</Table.Th>
                        <Table.Th color="#005BBF">Headshots</Table.Th>
                        <Table.Th color="#005BBF">Assists</Table.Th>
                        <Table.Th color="#005BBF">Deaths</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
                
                <Table.ScrollContainer minWidth={400} bg={"#1d1d1d"} style={{ borderRadius: "15px", display: BigThenMd ? "none" : "block" }}>
                  <Table striped highlightOnHover  horizontalSpacing="sm" verticalSpacing="sm">
                    <Table.Thead>
                      <Table.Tr bg={"#101010"} color="#005BBF">
                        <Table.Th color="#005BBF">Date</Table.Th>
                        <Table.Th color="#005BBF" display={BigThenMd ? "block" : "none"}>Player Team</Table.Th>
                        <Table.Th color="#005BBF">Opp.</Table.Th>
                        <Table.Th color="#005BBF">Map</Table.Th>
                        <Table.Th color="#005BBF">K</Table.Th>
                        <Table.Th color="#005BBF">HS</Table.Th>
                        <Table.Th color="#005BBF">A</Table.Th>
                        <Table.Th color="#005BBF">D</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>

              </Card>
            </FadeUpAni>

          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
