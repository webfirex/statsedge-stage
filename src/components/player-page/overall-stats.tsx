import { Card, Flex, Title, Text, Select, Space, Stack } from "@mantine/core";
import { Children } from "react";
import { type PlayerStatsTestType } from "~/lib/type";

export default function OverallStats(props: { player: PlayerStatsTestType }) {
  return (
    <Card p={"20px"}>
      <Title order={4} tt={"uppercase"}>
        Overall Stats
      </Title>
      <Flex justify={"space-between"} mt={"10px"}>
        <Text fz={"xs"}>Buddy Hield</Text>
        <Text fz={"xs"}>
          Based on {props.player.total_stats.games_count} games
        </Text>
      </Flex>

      <Flex gap={"10px"}>
        <Select
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={["React", "Angular", "Svelte", "Vue"]}
          placeholder="All Maps"
          radius={"lg"}
        />
        <Select
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={["React", "Angular", "Svelte", "Vue"]}
          placeholder="All Matches"
          radius={"lg"}
          // classNames={classes}
        />
        <Select
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={["React", "Angular", "Svelte", "Vue"]}
          placeholder="All Time"
          radius={"lg"}
          // classNames={classes}
        />
      </Flex>

      <Space />

      <Stack mt={"40px"} p={"10px"}>
        {Children.toArray(
          Object.entries(props.player.total_stats.averages).map(
            ([key, value]) => {
              return (
                <Flex
                  gap={"xs"}
                  p={"xs"}
                  style={{ borderRadius: "30px" }}
                  bg={"#1d1d1d"}
                >
                  <Text fz={"sm"} c="blue" tt="capitalize">
                    {key.replaceAll("_", " ")} -
                  </Text>

                  {typeof value === "number" && <Text fz={"sm"}>{value}</Text>}
                </Flex>
              );
            }
          )
        )}
      </Stack>
    </Card>
  );
}
