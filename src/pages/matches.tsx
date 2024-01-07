import {
  Container,
  Divider,
  Group,
  Image,
  SegmentedControl,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import {Children, useEffect, useState} from "react";
import { FadeUpAni } from "~/components/animation/fade-up";
import { AppGameSelector } from "~/components/app-page/game-selector";
import { AppMatchCard } from "~/components/app-page/match-card";
import { LayoutComp } from "~/components/layout";
import { SelectedGameAtom } from "~/lib/jotai";
import { BREAKPOINTS } from "~/styles/globals";

const TAB_LIST = ["All Matches", "Top Tier", "LAN", "Event"];


function TabsComp({ value }: { value: string[] }) {
  const [SelectedTab, setSelectedTab] = useState(value[0]!);

  return (
    <>
      {Children.toArray(
        value.map((tab) => (
          <>
            <Stack
              gap={5}
              onClick={() => setSelectedTab(tab)}
              style={{ cursor: "pointer" }}
            >
              <Text fw="bold" size="sm">
                {tab}
              </Text>

              <Divider
                size="md"
                color={SelectedTab === tab ? "blue" : "transparent"}
              />
            </Stack>
          </>
        ))
      )}
    </>
  );
}

export default function App() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const SelectedGame = useAtomValue(SelectedGameAtom);



  const [vState, setState]=useState([{
    id: '2131',
    live: true,
    startAt: "",
    league: {
      name: "name",
      logo: "https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&",
    },
    teams: {
      1: {
        name: "Liquid",
        logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
        points: "6 (1)",
      },
      2: {
        name: "Master",
        logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
        points: "6 (1)",
      },
    },
  }])


  /* eslint-disable */
  useEffect(() => {
    (async () => {
      setState([])
      /* eslint-disable */
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJza3lsZXJjYW1wZXIiLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOi0zMzA5MDQ4MTMzMzUyOTY5Njk3LCJjdXN0b21lciI6dHJ1ZX0.9SkaL3AeufKMI_AAH_1PtYEYAy8FQ46EJjHKsTvDTRo"

      const curDate = new Date();
      const laDate = curDate
      laDate.setDate(curDate.getDate() - 30)

      const lastDate = laDate.toISOString().split('T')[0];
      const queryParams = {
        sport: SelectedGame.alias||'',
        from: (new Date()).toISOString().split('T')[0]||'',
        to: (new Date()).toISOString().split('T')[0]||'',
        page: '1',
        pageCount: '8',
      };

      const response = await fetch(
          `https://api.gamescorekeeper.com/v1/fixtures?${new URLSearchParams(queryParams)}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
      const resData = await response.json()
      const tempState = resData.fixtures.map((item:any)=>{

        const startDate=new Date(item.scheduledStartTime)
        const pad = (num:number) => (num < 10 ? "0" + num : num);

        const year = startDate.getFullYear();
        const month = pad(startDate.getMonth() + 1); // Months are zero-based
        const day = pad(startDate.getDate());
        const dayOfWeek = startDate.toLocaleDateString('en-US', { weekday: 'short' });
        const hours = pad(startDate.getHours());
        const minutes = pad(startDate.getMinutes());

        return {
          id: item.competition.id,
          live: true,
          startAt:`${month}/${day}/${year} ${dayOfWeek} ${hours}:${minutes}`,
          league: {
            name: item.competition.name,
            logo: "https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&",
          },
          teams: {
            1: {
              name: item.participants[0].name,
              logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
              points: item.participants[0].score,
            },
            2: {
              name: item.participants[1].name,
              logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
              points: item.participants[1].score,
            },
          },
        }
      })
      setState(tempState)
    })()
  }, [SelectedGame])

  /* eslint-enable */

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack>
            <FadeUpAni>
              <AppGameSelector />
            </FadeUpAni>

            <FadeUpAni>
              <Group gap="xs">
                <Text c="blue" size="xl">
                  /
                </Text>

                <Text tt="uppercase">{SelectedGame.game}</Text>
              </Group>
            </FadeUpAni>

            <FadeUpAni>
              <Group justify="center" gap="xl">
                <TabsComp value={TAB_LIST} />
              </Group>
            </FadeUpAni>

            <Space h="xl" />

            <FadeUpAni>
              <Group
                {...(!BigThenMd
                  ? { grow: true, preventGrowOverflow: false, wrap: "nowrap" }
                  : {})}
              >
                <Image
                  src={SelectedGame.icon}
                  mah={BigThenMd ? 50 : 25}
                  alt="game icon"
                  fit="contain"
                />

                <Title order={BigThenMd ? 1 : 4} lh={1}>
                  Upcoming {SelectedGame.game} Matches
                </Title>
              </Group>
            </FadeUpAni>

            <Space />

            <FadeUpAni>
              <Group>
                <Stack gap={5}>
                  <Text c="dimmed" size="sm">
                    Select a date
                  </Text>

                  <Group gap="xs">
                    <SegmentedControl
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
                          value: "Upcoming",
                          label: (
                            <>
                              <Text
                                size={BigThenMd ? "sm" : "xs"}
                                my={3}
                                fw="bold"
                                mx="md"
                              >
                                Upcoming
                              </Text>
                            </>
                          ),
                        },
                        {
                          value: "Past",
                          label: (
                            <>
                              <Text
                                size={BigThenMd ? "sm" : "xs"}
                                my={3}
                                fw="bold"
                                mx="md"
                              >
                                Past
                              </Text>
                            </>
                          ),
                        },
                      ]}
                    />

                    <IconCalendar size={18} />
                  </Group>
                </Stack>
              </Group>
            </FadeUpAni>

            <Space h="xl" />

            <Stack gap="xl">
              {/*{Children.toArray(*/}
              {/*  MATCH_LIST.map((match) => (*/}
                  <>
                    <Stack>
                      {/*<FadeUpAni>*/}
                      {/*  <Group>*/}
                      {/*    <Title order={5} tt="uppercase">*/}
                      {/*      {match.date}*/}
                      {/*    </Title>*/}
                      {/*  </Group>*/}
                      {/*</FadeUpAni>*/}

                      {/*<Space />*/}

                      {Children.toArray(
                        vState.map((match) => (
                          <FadeUpAni>
                            <AppMatchCard
                              match={match}
                              game={{
                                name: SelectedGame.game,
                                icon: SelectedGame.icon,
                              }}
                            />
                          </FadeUpAni>
                        ))
                      )}
                      {vState.length==0 &&'No competition'}
                    </Stack>
                  </>
                {/*))*/}
              {/*)}*/}
            </Stack>
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
