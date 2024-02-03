import {
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { Children } from "react";
import { CircleFlag } from "react-circle-flags";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

type PlayerType = Exclude<
  MatchType["participants"]["one"]["team"],
  null
>["most_recent_lineup"][0];

interface MatchLineupProps {
  match: MatchType;
}

function PlayerCard(props: PlayerType) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Card
        withBorder
        p={BigThenXs ? "xs" : 0}
        style={{
          backgroundImage: "url(/player.jpg)",
        }}
        component={Link}
        href={`/player/${props.id}`}
      >
        <Stack gap={5} mb={BigThenXs ? 0 : rem(10)}>
          <Image
            src="/playerimg.png"
            alt={props.nickname}
            radius={6}
            fit="contain"
          />

          <Group justify="center" gap={5}>
            <Text ta="center" size={BigThenXs ? rem(15) : rem(9)}>
              {props.name}
            </Text>

            <CircleFlag
              countryCode={props.countryISO?.toLowerCase() ?? ""}
              height={BigThenXs ? 15 : 10}
            />
          </Group>
        </Stack>
      </Card>
    </>
  );
}

function LineupCard(props: MatchType["participants"]["one"]) {
  return (
    <>
      <Stack>
        <Group>
          <Image
            src={`/api/team/logo?id=${props.id}`}
            alt="league logo"
            fit="contain"
            h={30}
            fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
          />
          <Title order={5} tt="uppercase">
            Lineups
          </Title>
        </Group>

        {props.team?.most_recent_lineup ? (
          <SimpleGrid spacing={5} cols={props.team?.most_recent_lineup.length}>
            {Children.toArray(
              props.team?.most_recent_lineup.map((player) => (
                <>
                  <PlayerCard {...player} />
                </>
              ))
            )}
          </SimpleGrid>
        ) : (
          <>
            <Text>No Lineup Found</Text>
          </>
        )}
      </Stack>
    </>
  );
}

export function MatchLineupComp({ match }: MatchLineupProps) {
  return (
    <>
      <Card p="xs">
        <Stack>
          <LineupCard {...match.participants.one} />
          <LineupCard {...match.participants.two} />
        </Stack>
      </Card>
    </>
  );
}
