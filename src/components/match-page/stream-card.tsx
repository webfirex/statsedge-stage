import { Card, Center, Group, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

const ReactTwitchEmbedVideo = dynamic(
  () => import("react-twitch-embed-video"),
  {
    ssr: false,
  }
);

interface MatchStreamProps {
  match: MatchType;
}

export function MatchStreamComp({ match }: MatchStreamProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Card p="lg">
        <Stack gap="xl">
          <Group>
            <Title order={5} tt="uppercase">
              LiveStream
            </Title>

            <div
              style={{
                backgroundColor: "var(--mantine-color-red-6)",
                width: 8,
                height: 8,
                borderRadius: "50%",
              }}
            />
          </Group>

          {(() => {
            if (match.stream) {
              const streamURL = new URL(match.stream.value);

              const streamChannel = streamURL.searchParams.get("channel");

              if (streamChannel) {
                return (
                  <ReactTwitchEmbedVideo
                    width="100%"
                    channel={streamChannel}
                    layout="video"
                    height={BigThenXs ? "500px" : "250px"}
                  />
                );
              }
            }

            return (
              <Center h="500px">
                <Title maw={500} order={4} ta="center">
                  No stream available for this match. Please check back later.
                </Title>
              </Center>
            );
          })()}
        </Stack>
      </Card>
    </>
  );
}
