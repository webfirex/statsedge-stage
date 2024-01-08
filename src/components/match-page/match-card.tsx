import { Box, Card, Flex, Group, Image, Stack, Text, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GameLogoUrl, NumTimeFormat } from "~/lib/functions";
import { BREAKPOINTS } from "~/styles/globals";
import { type RouterOutputs } from "~/utils/api";

interface MatchCardProps {
  match: Exclude<
    RouterOutputs["fixture"]["list"]["data"],
    undefined
  >["fixtures"][0]["fixtures"][0];
}

export function MatchCard(props: MatchCardProps) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  if (!BigThenMd) {
    return (
      <>
        <Card withBorder bg="transparent" px={5} py="xs">
          <Flex gap={5} justify="space-between" w="100%">
            <Image
              src={GameLogoUrl(props.match.sport.alias)}
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
                  src={`/api/team/logo?id=${props.match.participants[0]!.id}`}
                  alt="league logo"
                  fit="contain"
                  mah={rem(15)}
                />
                <Text size={rem(10)} maw={100} truncate="end">
                  {props.match.participants[0]!.name}
                </Text>
              </Group>

              <Group gap={3}>
                <Image
                  src={`/api/team/logo?id=${props.match.participants[1]!.id}`}
                  alt="league logo"
                  fit="contain"
                  mah={rem(15)}
                />
                <Text size={rem(10)} maw={100} truncate="end">
                  {props.match.participants[1]!.name}
                </Text>
              </Group>
            </Stack>

            <Stack gap="xs" my="auto">
              <Text size={rem(10)}>{props.match.participants[1]!.score}</Text>

              <Text size={rem(10)}>{props.match.participants[1]!.score}</Text>
            </Stack>

            <Stack gap="xs" my="auto">
              <Group gap={3}>
                <Image
                  // TODO: use league logo
                  src="https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&"
                  alt="league logo"
                  fit="contain"
                  mah={rem(20)}
                />
                <Text size={rem(10)} maw={150} lh={rem(14)}>
                  {props.match.competition.name}
                </Text>
              </Group>

              <Group gap={3}>
                {props.match.links.length > 0 && (
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
                  {NumTimeFormat(props.match.scheduledStartTime, "Mon, 14:00")}
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
            src={GameLogoUrl(props.match.sport.alias)}
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
            <Text size="xs">BO{props.match.format.value}</Text>
          </Box>

          <Stack gap={5}>
            <Group>
              <Image
                src={`/api/team/logo?id=${props.match.participants[0]!.id}`}
                alt="league logo"
                fit="contain"
                mah={20}
              />
              <Text size="xs" w={120}>
                {props.match.participants[0]!.name}
              </Text>
            </Group>

            <Group>
              <Image
                src={`/api/team/logo?id=${props.match.participants[1]!.id}`}
                alt="league logo"
                fit="contain"
                mah={20}
              />
              <Text size="xs" w={120}>
                {props.match.participants[1]!.name}
              </Text>
            </Group>
          </Stack>

          <Stack gap={5}>
            <Text size="xs">{props.match.participants[0]!.score}</Text>

            <Text size="xs">{props.match.participants[1]!.score}</Text>
          </Stack>

          <Group>
            <Image
              src="https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&"
              alt="league logo"
              fit="contain"
              mah={30}
            />
            <Text size="xs" w={150}>
              {props.match.competition.name}
            </Text>
          </Group>

          <Group
            style={{
              // * hide if not live, without removing space
              visibility: props.match.links.length > 0 ? "visible" : "hidden",
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
            {NumTimeFormat(props.match.scheduledStartTime, "Mon, 14:00")}
          </Text>
        </Group>
      </Card>
    </>
  );
}
