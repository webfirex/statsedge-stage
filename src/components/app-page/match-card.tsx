import { Box, Card, Flex, Group, Image, Stack, Text, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";

export function AppMatchCard(props: {
  game: {
    name: string;
    icon: string;
  };
  match: {
    id: string;
    live: boolean;
    startAt: string;
    league: {
      name: string;
      logo: string;
    };
    teams: {
      1: {
        name: string;
        logo: string;
        points: string;
      };

      2: {
        name: string;
        logo: string;
        points: string;
      };
    };
  };
}) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  if (!BigThenMd) {
    return (
      <>
        <Card withBorder bg="transparent" px={5} py="xs">
          <Flex gap={5} justify="space-between" w="100%">
            <Image
              src={props.game.icon}
              mah={rem(20)}
              alt="game icon"
              fit="contain"
              style={{
                filter: "grayscale(1)",
                flexGrow: 0,
              }}
              my="auto"
            />

            <Box
              p={5}
              bg="dark.7"
              h="fit-content"
              style={{
                border: "2px solid #333",
                flexGrow: 0,
              }}
              my="auto"
            >
              <Text size={rem(10)}>BO3</Text>
            </Box>

            <Stack
              gap={3}
              style={{
                flexGrow: 0,
              }}
              my="auto"
            >
              <Group gap={3}>
                <Image
                  src={props.match.teams[1].logo}
                  alt="league logo"
                  fit="contain"
                  mah={rem(15)}
                />
                <Text size={rem(10)} maw={100} truncate="end">
                  {props.match.teams[1].name}
                </Text>
              </Group>

              <Group gap={3}>
                <Image
                  src={props.match.teams[2].logo}
                  alt="league logo"
                  fit="contain"
                  mah={rem(15)}
                />
                <Text size={rem(10)}>{props.match.teams[2].name}</Text>
              </Group>
            </Stack>

            <Stack gap="xs" my="auto">
              <Text size={rem(10)}>{props.match.teams[1].points}</Text>

              <Text size={rem(10)}>{props.match.teams[2].points}</Text>
            </Stack>

            <Stack gap="xs" my="auto">
              <Group gap={3}>
                <Image
                  src={props.match.league.logo}
                  alt="league logo"
                  fit="contain"
                  mah={rem(20)}
                />
                <Text size={rem(10)} maw={150} lh={rem(14)}>
                  {props.match.league.name}
                </Text>
              </Group>

              <Group gap={3}>
                {props.match.live && (
                  <Group gap={3}>
                    <Box
                      style={{
                        backgroundColor: "var(--mantine-color-red-6)",
                        borderRadius: "50%",
                        width: "7px",
                        height: "7px",
                      }}
                    />

                    <Text size={rem(10)}>LIVE</Text>
                  </Group>
                )}

                <Text size={rem(10)} c="blue">
                  {props.match.startAt}
                </Text>
              </Group>
            </Stack>
          </Flex>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card withBorder bg="transparent">
        <Group justify="space-around">
          <Image
            src={props.game.icon}
            mah={30}
            alt="game icon"
            fit="contain"
            style={{
              filter: "grayscale(1)",
            }}
          />

          <Box
            p="xs"
            bg="dark.7"
            style={{
              border: "2px solid #333",
            }}
          >
            <Text size="xs">BO3</Text>
          </Box>

          <Stack gap={5}>
            <Group>
              <Image
                src={props.match.teams[1].logo}
                alt="league logo"
                fit="contain"
                mah={20}
              />
              <Text size="xs">{props.match.teams[1].name}</Text>
            </Group>

            <Group>
              <Image
                src={props.match.teams[2].logo}
                alt="league logo"
                fit="contain"
                mah={20}
              />
              <Text size="xs">{props.match.teams[2].name}</Text>
            </Group>
          </Stack>

          <Stack gap={5}>
            <Text size="xs">{props.match.teams[1].points}</Text>

            <Text size="xs">{props.match.teams[2].points}</Text>
          </Stack>

          <Group>
            <Image
              src={props.match.league.logo}
              alt="league logo"
              fit="contain"
              mah={30}
            />
            <Text size="xs">{props.match.league.name}</Text>
          </Group>

          <Group
            style={{
              // hide if not live, without removing space
              visibility: props.match.live ? "visible" : "hidden",
            }}
          >
            <Box
              style={{
                backgroundColor: "var(--mantine-color-red-6)",
                borderRadius: "50%",
                width: "7px",
                height: "7px",
              }}
            />

            <Text size="xs">LIVE</Text>
          </Group>

          <Text size="xs" c="blue">
            {props.match.startAt}
          </Text>
        </Group>
      </Card>
    </>
  );
}
