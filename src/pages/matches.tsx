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
import { Children, useState } from "react";
import { FadeUpAni } from "~/components/animation/fade-up";
import { AppGameSelector } from "~/components/app-page/game-selector";
import { AppMatchCard } from "~/components/app-page/match-card";
import { LayoutComp } from "~/components/layout";
import { SelectedGameAtom } from "~/lib/jotai";
import { BREAKPOINTS } from "~/styles/globals";

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
      },
      {
        id: "3",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
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
      },
      {
        id: "4",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
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
      },
      {
        id: "3",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
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
      },
      {
        id: "4",
        live: true,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
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
      },
      {
        id: "4",
        live: false,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
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
      },
      {
        id: "4",
        live: false,
        startAt: "Tue, 15:00",
        league: {
          name: "ESL Challenger League Season 44 Europe",
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
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const SelectedGame = useAtomValue(SelectedGameAtom);

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
              {Children.toArray(
                MATCH_LIST.map((match) => (
                  <>
                    <Stack>
                      <FadeUpAni>
                        <Group>
                          <Title order={5} tt="uppercase">
                            {match.date}
                          </Title>
                        </Group>
                      </FadeUpAni>

                      <Space />

                      {Children.toArray(
                        match.matches.map((match) => (
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
