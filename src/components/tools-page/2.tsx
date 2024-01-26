import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { tools } from "~/pages/api/charts/tools/2";
import { Flex, Table, Image, Card, Title, Text, Select, Box } from "@mantine/core";

ToolsTable2.displayName = 'ToolsTable2';

export default function ToolsTable2 () {
    const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)
    const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`)
  
    const rows = tools.map((element) => (
      <Table.Tr key={element.player}>
        <Table.Td miw={BigThenMd ? "unset" : "300"}>
          <Flex gap={"10px"} align={"center"}>
          <Image
            src={"/playerimg.png"}
            alt="league logo"
            fit="contain"
            h={"50"}
            radius={"sm"}
          />
          <Flex gap={"10px"}>
            <Flex direction={"column"}>
                <Text fz={"md"} fw={"bold"}>{element.player}</Text>
                <Text fz={"xs"} opacity={"0.6"}>{element.team}</Text>
            </Flex>
            <Flex direction={"column"}>
                <Text fz={"md"} fw={"bold"}>{element.match}</Text>
                <Text fz={"xs"} opacity={"0.6"}>{element.matchDate}</Text>
            </Flex>
          </Flex>
          </Flex>
          
        </Table.Td>
        <Table.Td miw={BigThenMd ? "unset" : "150"}>
          {element.stats}
        </Table.Td>
        <Table.Td>
          {element.ou}
        </Table.Td>
        <Table.Td>{element.p}</Table.Td>
        <Table.Td miw={"70"}>{element.proj}</Table.Td>
        <Table.Td p={"5"}><Card w={80} bg={"#0D431F"} ta={"center"} m={"0"} px={"2px"}>{element.projD}</Card></Table.Td>
        <Table.Td>
            <Box display={"flex"} style={{ gap: "10px", border: "1px solid #1d1d1d", padding: "5px", borderRadius: "5px" }} miw={"80"} maw={"80"} bg={"#071225"}>
              <Image
                src={"/icon-2.png"}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 20 : 15}
              />
              <Text fz={"sm"}>{element.odds}</Text>
            </Box>
        </Table.Td>
        <Table.Td p={"5"}><Card w={80} bg={"#0D431F"} ta={"center"} m={"0"} px={"2px"}>{element.vs}</Card></Table.Td>
        <Table.Td p={"5"}><Card w={80} bg={"#0D431F"} ta={"center"} m={"0"} px={"2px"}>{element.l5}</Card></Table.Td>
        <Table.Td p={"5"}><Card w={80} bg={"#0D431F"} ta={"center"} m={"0"} px={"2px"}>{element.l10}</Card></Table.Td>
        <Table.Td p={"5"}><Card w={80} bg={"#0D431F"} ta={"center"} m={"0"} px={"2px"}>{element.l30}</Card></Table.Td>
      </Table.Tr>
    ));

    return (    
        <>
        <Table.ScrollContainer minWidth={500} bg={"#1d1d1d"} style={{ borderRadius: "15px", }}>
          <Table striped highlightOnHover  horizontalSpacing="sm" verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr bg={"#101010"} color="#005BBF">
                <Table.Th color="#005BBF">Player Name</Table.Th>
                <Table.Th color="#005BBF">Stats</Table.Th>
                <Table.Th color="#005BBF">O/U</Table.Th>
                <Table.Th color="#005BBF"><Image src={"/prep.svg"} alt="logo" w={"25"} /></Table.Th>
                <Table.Th color="#005BBF">Proj</Table.Th>
                <Table.Th color="#005BBF">Proj Diff</Table.Th>
                <Table.Th color="#005BBF">Game Odds</Table.Th>
                <Table.Th color="#005BBF">VS</Table.Th>
                <Table.Th color="#005BBF">L5</Table.Th>
                <Table.Th color="#005BBF">L10</Table.Th>
                <Table.Th color="#005BBF">L30</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        </>
    )
}