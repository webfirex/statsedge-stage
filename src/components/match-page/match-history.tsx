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
import { Children } from "react";
import { type MatchType } from "~/lib/type";

interface MatchHistoryCardProps {
  participant: MatchType["participants"]["one"];
}

export function MatchHistoryCard({ participant }: MatchHistoryCardProps) {
  return (
    <>
      <Card>
        <Stack>
          <Group>
            <Image
              src={`/api/team/logo?id=${participant.id}`}
              alt="league logo"
              fit="contain"
              h={25}
              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
            />

            <Text>{participant.name ?? "Unknown"}</Text>
          </Group>

          <Divider />

          {(() => {
            if (!participant.recent_matches) return <Text>No History</Text>;

            return Children.toArray(
              participant.recent_matches.fixtures.map((fixture, index) => (
                <Group key={index} justify="space-between">
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

        <MatchHistoryCard participant={match.participants.one} />

        <MatchHistoryCard participant={match.participants.two} />
      </Stack>
    </>
  );
}
