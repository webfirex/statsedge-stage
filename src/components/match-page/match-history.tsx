import {
  Badge,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { Children } from "react";
import { type MatchType } from "~/lib/type";

interface MatchHistoryCardProps {
  participant: Exclude<MatchType["participants"]["one"], null>;
}

export function MatchHistoryCard({ participant }: MatchHistoryCardProps) {
  return (
    <>
      <Card>
        <Stack>
          <Link
            href={`/team/${participant.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Group>
              <Image
                src={`/api/team/logo?id=${participant.id}`}
                alt="league logo"
                fit="contain"
                h={25}
                fallbackSrc="/place.svg"
              />

              <Text>{participant.name ?? "Unknown"}</Text>
            </Group>
          </Link>

          <Divider />

          {(() => {
            if (!participant.recent_matches) return <Text>No History</Text>;

            return Children.toArray(
              participant.recent_matches.fixtures.map((fixture) => (
                <Link
                  href={`/team/${fixture.opponentId}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Group justify="space-between">
                    {fixture.opponentName ?? "Unknown"}
                    <Badge
                      color={
                        fixture.score > fixture.opponentScore ? "green" : "red"
                      }
                      variant="light"
                      c="white"
                    >
                      BO{fixture.detail.format.value} {fixture.score}-
                      {fixture.opponentScore}
                    </Badge>
                  </Group>
                </Link>
              ))
            );
          })()}
        </Stack>
      </Card>
    </>
  );
}

interface MatchHistoryProps {
  match: MatchType;
}

export function MatchHistoryComp({ match }: MatchHistoryProps) {
  return (
    <>
      <Stack mt={10}>
        <Title order={5} tt="uppercase">
          Match History
        </Title>

        {match.participants.one && (
          <MatchHistoryCard participant={match.participants.one} />
        )}

        {match.participants.two && (
          <MatchHistoryCard participant={match.participants.two} />
        )}
      </Stack>
    </>
  );
}
