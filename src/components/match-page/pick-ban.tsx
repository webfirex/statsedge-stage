import { Box, Flex, Image, Paper, Stack, Text } from "@mantine/core";
import { Children } from "react";
import { type MatchType } from "~/lib/type";

interface MatchMapPickBanProps {
  match: MatchType;
}

export function MatchMapPickBanComp({ match }: MatchMapPickBanProps) {
  return (
    <>
      <Stack gap={0}>
        <Paper
          p="xs"
          style={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Flex gap="md">
            <Text c="indigo">Maps</Text>
            <Text c="indigo" ml="auto">
              Removed
            </Text>
            <Text c="indigo">Picked</Text>
          </Flex>
        </Paper>

        {Children.toArray(
          match.pickBanMap?.map((map, index) => (
            <Paper
              px="xs"
              radius={0}
              bg="dark.5"
              style={{
                borderBottom:
                  index === (match.pickBanMap?.length ?? 0) - 1
                    ? "none"
                    : "1px solid var(--mantine-color-dark-4)",
              }}
            >
              <Flex align="center" py="xs">
                <Text>{map.mapName}</Text>
                <Box miw={90} ta="center" ml="auto">
                  {map.pickOrBan === "ban" && map.teamId ? (
                    <Image
                      src={`/api/team/logo?id=${map.teamId}`}
                      alt="league logo"
                      fit="contain"
                      h={30}
                      ml="auto"
                      fallbackSrc="/place.svg"
                    />
                  ) : (
                    <Text>-</Text>
                  )}
                </Box>
                <Box miw={50} ta="center">
                  {map.pickOrBan === "pick" && map.teamId ? (
                    <Image
                      src={`/api/team/logo?id=${map.teamId}`}
                      alt={`${map.teamId} logo`}
                      fit="contain"
                      h={30}
                      ml="auto"
                      fallbackSrc="/place.svg"
                    />
                  ) : (
                    <Text>-</Text>
                  )}
                </Box>
              </Flex>
            </Paper>
          ))
        )}
      </Stack>
    </>
  );
}
