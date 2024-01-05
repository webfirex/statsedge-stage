import { Box, Card, Group, Image, Stack, Text } from "@mantine/core";

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
