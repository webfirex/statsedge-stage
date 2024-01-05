import { useUser } from "@clerk/nextjs";
import {
  Center,
  Container,
  Divider,
  Group,
  Image,
  Loader,
  SegmentedControl,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { Children, useState } from "react";
import { AppGameSelector } from "~/components/app-page/game-selector";
import { AppMatchCard } from "~/components/app-page/match-card";
import { LayoutComp } from "~/components/layout";
import { SelectedGameAtom } from "~/lib/jotai";

const TAB_LIST = ["All Matches", "Top Tier", "LAN", "Event"];

const MATCH_LIST = [
  {
    date: "Tuesday, 12th October 2021",
    matches: [
      {
        id: "1",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
          logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6258193bcca7edacaaeafa2f_RL.svg",
        },
        teams: {
          1: {
            name: "Liquid",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
          2: {
            name: "Masterminds",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
        },
      },
      {
        id: "3",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
          logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6258193bcca7edacaaeafa2f_RL.svg",
        },
        teams: {
          1: {
            name: "Liquid",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
          2: {
            name: "Masterminds",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
        },
      },
      {
        id: "4",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
          logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6258193bcca7edacaaeafa2f_RL.svg",
        },
        teams: {
          1: {
            name: "Liquid",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
          2: {
            name: "Masterminds",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
        },
      },
    ],
  },
  {
    date: "Tuesday, 13th October 2021",
    matches: [
      {
        id: "1",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
          logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6258193bcca7edacaaeafa2f_RL.svg",
        },
        teams: {
          1: {
            name: "Liquid",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
          2: {
            name: "Masterminds",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
        },
      },
      {
        id: "3",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
          logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6258193bcca7edacaaeafa2f_RL.svg",
        },
        teams: {
          1: {
            name: "Liquid",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
          2: {
            name: "Masterminds",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
        },
      },
      {
        id: "4",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
          logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6258193bcca7edacaaeafa2f_RL.svg",
        },
        teams: {
          1: {
            name: "Liquid",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
          2: {
            name: "Masterminds",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
        },
      },
      {
        id: "4",
        live: false,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
          logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6258193bcca7edacaaeafa2f_RL.svg",
        },
        teams: {
          1: {
            name: "Liquid",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
          2: {
            name: "Masterminds",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
        },
      },
      {
        id: "4",
        live: false,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
          logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6258193bcca7edacaaeafa2f_RL.svg",
        },
        teams: {
          1: {
            name: "Liquid",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
          2: {
            name: "Masterminds",
            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
            points: "6 (1)",
          },
        },
      },
    ],
  },
];

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
  const { isSignedIn, isLoaded: UserIsLoaded } = useUser();

  const SelectedGame = useAtomValue(SelectedGameAtom);

  const router = useRouter();

  if (!UserIsLoaded) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  if (!isSignedIn) {
    void router.push("/signin");

    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack>
            <AppGameSelector />

            <Group gap="xs">
              <Text c="blue" size="xl">
                /
              </Text>

              <Text tt="uppercase">{SelectedGame.game}</Text>
            </Group>

            <Group justify="center" gap="xl">
              <TabsComp value={TAB_LIST} />
            </Group>

            <Space h="xl" />

            <Group>
              <Image
                src={SelectedGame.icon}
                mah={50}
                alt="game icon"
                fit="contain"
              />

              <Title> Upcoming {SelectedGame.game} Matches</Title>
            </Group>

            <Space />

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
                            <Text size="sm" my={3} fw="bold" mx="md">
                              Upcoming
                            </Text>
                          </>
                        ),
                      },
                      {
                        value: "Past",
                        label: (
                          <>
                            <Text size="sm" my={3} fw="bold" mx="md">
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

            <Space h="xl" />

            <Stack gap="xl">
              {Children.toArray(
                MATCH_LIST.map((match) => (
                  <>
                    <Stack>
                      <Group>
                        <Title order={5} tt="uppercase">
                          {match.date}
                        </Title>
                      </Group>

                      <Space />

                      {Children.toArray(
                        match.matches.map((match) => (
                          <>
                            <AppMatchCard
                              match={match}
                              game={{
                                name: SelectedGame.game,
                                icon: SelectedGame.icon,
                              }}
                            />
                          </>
                        ))
                      )}
                    </Stack>
                  </>
                ))
              )}
            </Stack>
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
