import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { Flex, Table, Image, Card, Title, Text, Select } from "@mantine/core";
import { type PlayerStatsTestType } from "~/lib/type";
import { Children } from "react";

export function PlayerMatchHistory(props: { player: PlayerStatsTestType }) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const rows = Children.toArray(
    props.player.history_matches.map((element) => (
      <Table.Tr>
        <Table.Td>21.06.2021</Table.Td>
        <Table.Td display={BigThenMd ? "block" : "none"}>
          <Flex>
            <Image
              src={"/place.svg"}
              alt="league logo"
              fit="contain"
              h={BigThenXs ? 20 : 15}
            />
            {props.player.current_team?.name ?? "N/A"}
          </Flex>
        </Table.Td>
        <Table.Td>
          <Flex display={BigThenMd ? "flex" : "none"}>
            <Image
              src={"/place.svg"}
              alt="league logo"
              fit="contain"
              h={BigThenXs ? 20 : 15}
            />
            {
              element?.opponents.find(
                (opponent) =>
                  opponent.opponent.id !== props.player.current_team?.id
              )?.opponent.name
            }
          </Flex>
          <Flex display={BigThenMd ? "none" : "flex"}>
            <Image
              src={"/place.svg"}
              alt="league logo"
              fit="contain"
              h={BigThenXs ? 20 : 15}
            />
          </Flex>
        </Table.Td>
        <Table.Td>MAp</Table.Td>
        <Table.Td>{element?.final.assists}</Table.Td>
        <Table.Td>{element?.final.deaths}</Table.Td>
        <Table.Td>{element?.final.kills}</Table.Td>
        <Table.Td>{element?.final.kd}</Table.Td>
      </Table.Tr>
    ))
  );

  return (
    <Card display={"flex"} flex={"column"} style={{ gap: "20px" }}>
      <Flex gap={"lg"} wrap={"wrap"} align={"baseline"} pl={"20px"}>
        <Title order={4}>MATCH HISTORY</Title>
        <Flex gap={"xs"} align={"center"} display={BigThenMd ? "flex" : "none"}>
          <Flex gap={"xs"} align={"baseline"}>
            <Text fz={"md"}>Rows</Text>
            <Select
              comboboxProps={{ withinPortal: true }}
              data={["React", "Angular", "Svelte", "Vue"]}
              placeholder="Rows"
              radius={"lg"}
              // classNames={classes}
            />
          </Flex>
          <Flex gap={"xs"} align={"baseline"}>
            <Text fz={"md"}>Maps</Text>
            <Select
              comboboxProps={{ withinPortal: true }}
              data={["React", "Angular", "Svelte", "Vue"]}
              placeholder="All Maps"
              radius={"lg"}
              // classNames={classes}
            />
          </Flex>
        </Flex>
      </Flex>

      <Table.ScrollContainer
        minWidth={500}
        bg={"#1d1d1d"}
        style={{ borderRadius: "15px", display: BigThenMd ? "block" : "none" }}
      >
        <Table
          striped
          highlightOnHover
          horizontalSpacing="sm"
          verticalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr bg={"#101010"} color="#005BBF">
              <Table.Th color="#005BBF">Date</Table.Th>
              <Table.Th color="#005BBF" display={BigThenMd ? "block" : "none"}>
                Player Team
              </Table.Th>
              <Table.Th color="#005BBF">Opponent</Table.Th>
              <Table.Th color="#005BBF">Map</Table.Th>
              <Table.Th color="#005BBF">Assists</Table.Th>
              <Table.Th color="#005BBF">Deaths</Table.Th>
              <Table.Th color="#005BBF">Kills</Table.Th>
              <Table.Th color="#005BBF">K/D</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Table.ScrollContainer
        minWidth={400}
        bg={"#1d1d1d"}
        style={{ borderRadius: "15px", display: BigThenMd ? "none" : "block" }}
      >
        <Table
          striped
          highlightOnHover
          horizontalSpacing="sm"
          verticalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr bg={"#101010"} color="#005BBF">
              <Table.Th color="#005BBF">Date</Table.Th>
              <Table.Th color="#005BBF" display={BigThenMd ? "block" : "none"}>
                Player Team
              </Table.Th>
              <Table.Th color="#005BBF">Opp.</Table.Th>
              <Table.Th color="#005BBF">Map</Table.Th>
              <Table.Th color="#005BBF">K</Table.Th>
              <Table.Th color="#005BBF">HS</Table.Th>
              <Table.Th color="#005BBF">A</Table.Th>
              <Table.Th color="#005BBF">D</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  );
}
