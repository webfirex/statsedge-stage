import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { tools } from "~/pages/api/charts/tools/1";
import {
  Flex,
  Table,
  Image,
  Card,
  Text,
  Box,
} from "@mantine/core";

ToolsTable1.displayName = "ToolsTable1";

export default function ToolsTable1() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

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
              <Text fz={"md"} fw={"bold"}>
                {element.player}
              </Text>
              <Text fz={"xs"} opacity={"0.6"}>
                {element.team}
              </Text>
            </Flex>
            <Flex direction={"column"}>
              <Text fz={"md"} fw={"bold"}>
                {element.match}
              </Text>
              <Text fz={"xs"} opacity={"0.6"}>
                {element.matchDate}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Table.Td>
      <Table.Td miw={BigThenMd ? "unset" : "150"}>{element.stats}</Table.Td>
      <Table.Td>{element.ou}</Table.Td>
      <Table.Td>{element.p}</Table.Td>
      <Table.Td>
        <Box
          display={"flex"}
          style={{
            gap: "10px",
            border: "1px solid #1d1d1d",
            padding: "5px",
            borderRadius: "5px",
          }}
          miw={"80"}
          maw={"80"}
          bg={"#071225"}
        >
          <Text ta={"center"} w={"100%"} fz={"sm"}>
            {element.odds}
          </Text>
        </Box>
      </Table.Td>
      <Table.Td>{element.se}</Table.Td>
      <Table.Td p={"5"}>
        <Flex direction={"column"} gap={"5px"}>
          <Text ta={"center"} fz={"xs"}>
            {element.i1[0]}
          </Text>
          <Card bg={"#3a3a3a"} p={"xs"} fz={"xs"} ta={"center"}>
            {element.i1[1]}
          </Card>
        </Flex>
      </Table.Td>
      <Table.Td p={"5"}>
        <Flex direction={"column"} gap={"5px"}>
          <Text ta={"center"} fz={"xs"}>
            {element.i2[0]}
          </Text>
          <Card bg={"#3a3a3a"} p={"xs"} fz={"xs"} ta={"center"}>
            {element.i2[1]}
          </Card>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table.ScrollContainer
        minWidth={500}
        bg={"#1d1d1d"}
        style={{ borderRadius: "15px" }}
      >
        <Table
          striped
          highlightOnHover
          horizontalSpacing="sm"
          verticalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr bg={"#101010"} color="#005BBF">
              <Table.Th color="#005BBF">Player Name</Table.Th>
              <Table.Th color="#005BBF">Stats</Table.Th>
              <Table.Th color="#005BBF">O/U</Table.Th>
              <Table.Th color="#005BBF">
                <Image src={"/prep.svg"} alt="logo" w={"25"} />
              </Table.Th>
              <Table.Th color="#005BBF">Odds Hit %</Table.Th>
              <Table.Th color="#005BBF">
                <Image src={"/logo.png"} alt="logo" w={"25"} />
              </Table.Th>
              <Table.Th color="#005BBF">
                <Flex justify={"center"}>
                  <Image src={"/icon-3.png"} alt="logo" w={"25"} />
                </Flex>
              </Table.Th>
              <Table.Th color="#005BBF">
                <Flex justify={"center"}>
                  <Image src={"/icon-4.png"} alt="logo" w={"25"} />
                </Flex>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
