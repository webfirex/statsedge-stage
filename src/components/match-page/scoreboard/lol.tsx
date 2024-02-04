import {
  Badge,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { Children } from "react";
import { type MatchType } from "~/lib/type";

interface MatchScoreboardProps {
  match: MatchType;
}

export function MatchScoreboardLOLComp({ match }: MatchScoreboardProps) {
  return (
    <>
      <Stack>
        <Grid columns={10} gutter="xs">
          <Grid.Col span={{ base: 10, md: 7 }}>match</Grid.Col>

          <Grid.Col span={{ base: 10, md: 3 }}>
            <Card>
              <Card.Section>
                <Paper p="xs" bg="dark.5">
                  <Text ta="center" tt="uppercase" fw="bold">
                    Champions
                  </Text>
                </Paper>
              </Card.Section>

              <Stack mt="md">
                <Group>
                  <Image
                    src={`/api/team/logo?id=${match.participants.one?.id}`}
                    alt="league logo"
                    fit="contain"
                    h={25}
                    fallbackSrc="/place.svg"
                  />

                  <Text>{match.participants.one?.name ?? "Unknown"}</Text>
                </Group>

                <Divider />

                <Group>
                  <Badge size="lg" radius="xs" color="gray">
                    BAN
                  </Badge>

                  {Children.toArray(
                    match.pickBanHero?.one.ban.map(() => (
                      <Image
                        src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/riki.png?"
                        alt="champion icon"
                        fit="contain"
                        h={25}
                        fallbackSrc="/place.svg"
                      />
                    ))
                  )}
                </Group>

                <Group>
                  <Badge size="lg" radius="xs" color="gray">
                    PICK
                  </Badge>

                  {Children.toArray(
                    match.pickBanHero?.one.pick.map(() => (
                      <Image
                        src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/riki.png?"
                        alt="champion icon"
                        fit="contain"
                        h={25}
                        fallbackSrc="/place.svg"
                      />
                    ))
                  )}
                </Group>

                <Group>
                  <Image
                    src={`/api/team/logo?id=${match.participants.two?.id}`}
                    alt="league logo"
                    fit="contain"
                    h={25}
                    fallbackSrc="/place.svg"
                  />

                  <Text>{match.participants.two?.name ?? "Unknown"}</Text>
                </Group>

                <Divider />

                <Group>
                  <Badge size="lg" radius="xs" color="gray">
                    BAN
                  </Badge>

                  {Children.toArray(
                    match.pickBanHero?.two.ban.map(() => (
                      <Image
                        src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/riki.png?"
                        alt="champion icon"
                        fit="contain"
                        h={25}
                        fallbackSrc="/place.svg"
                      />
                    ))
                  )}
                </Group>

                <Group>
                  <Badge size="lg" radius="xs" color="gray">
                    PICK
                  </Badge>

                  {Children.toArray(
                    match.pickBanHero?.two.pick.map(() => (
                      <Image
                        src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/riki.png?"
                        alt="champion icon"
                        fit="contain"
                        h={25}
                        fallbackSrc="/place.svg"
                      />
                    ))
                  )}
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Card>scoreboard</Card>
      </Stack>
    </>
  );
}
