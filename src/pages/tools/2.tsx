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
  CopyButton,
  Button,
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
import OverallStats from "~/components/player-page/overall-stats";
import MatchStats from "~/components/player-page/match-stats";
import PlayerMatchHistory from "~/components/player-page/match-history";
import HitRate from "~/components/player-page/hit-rate";
import { CircleFlag } from "react-circle-flags";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TeamDetails } from "~/components/team-page/team-details";
import PropsTable from "~/components/props-page/table";
import ToolsTable2 from "~/components/tools-page/2";

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
              <SportSelector
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
                    text: `Tools`,
                    link: `/tools/2`,
                  }
                ]}
              />
            </FadeUpAni>
            
            <FadeUpAni>
                <Card display={"flex"} style={{ 
                    alignItems: "center",
                    gap: "15px",
                    flexDirection: "row",
                    padding: "30px",
                }}>
                    <Button  bg={"transparent"} style={{
                        border: "1px solid #00acef",
                        boxShadow: "0 0 10px #00acef50",
                    }}><Title order={5} tt={"uppercase"}>Prize Picks</Title></Button>
                    <Button  bg={"transparent"} ><Title order={5} tt={"uppercase"}>UnderDog</Title></Button>
                </Card>
            </FadeUpAni>

            <FadeUpAni>
                <Flex gap={"xs"} wrap={"wrap"}>
                    <Select
                      maw={BigThenMd ? 150 : 100}
                      comboboxProps={{ withinPortal: true }}
                      data={['React', 'Angular', 'Svelte', 'Vue']}
                      placeholder="All Props"
                      radius={"sm"}
                      bg={"transparent"}
                      // classNames={classes}
                    />
                    <Select
                      maw={BigThenMd ? 150 : 100}
                      comboboxProps={{ withinPortal: true }}
                      data={['React', 'Angular', 'Svelte', 'Vue']}
                      placeholder="All Games"
                      radius={"sm"}
                      bg={"transparent"}
                      // classNames={classes}
                    />
                    <Select
                      maw={BigThenMd ? 150 : 100}
                      comboboxProps={{ withinPortal: true }}
                      data={['React', 'Angular', 'Svelte', 'Vue']}
                      placeholder="All Players"
                      radius={"sm"}
                      bg={"transparent"}
                      // classNames={classes}
                    />
                    <Select
                      maw={150}
                      comboboxProps={{ withinPortal: true }}
                      data={['React', 'Under', 'Svelte', 'Vue']}
                      placeholder="Over/Under"
                      radius={"sm"}
                      bg={"transparent"}
                      // classNames={classes}
                    /> 
                    <Select
                      maw={150}
                      comboboxProps={{ withinPortal: true }}
                      data={['React', 'Angular', 'Svelte', 'Vue']}
                      placeholder="All Maps"
                      radius={"sm"}
                      bg={"transparent"}
                      // classNames={classes}
                    />
                </Flex>
            </FadeUpAni>

            <Space />

            <FadeUpAni>
                <ToolsTable2 />
            </FadeUpAni>

          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
