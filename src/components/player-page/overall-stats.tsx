import { Card, Flex, Title, Text, Select, Space, Grid } from "@mantine/core";

export default function OverallStats() {
    return (
        <Card p={"20px"}>
          <Title order={4} tt={"uppercase"}>Overall Stats</Title>
          <Flex justify={"space-between"} mt={"10px"}>
            <Text fz={"xs"}>Buddy Hield</Text>
            <Text fz={"xs"}>Based on 1290 Maps</Text>
          </Flex>

          <Flex gap={"10px"}>
            <Select
              mt="md"
              comboboxProps={{ withinPortal: true }}
              data={['React', 'Angular', 'Svelte', 'Vue']}
              placeholder="All Maps"
              radius={"lg"}
              // classNames={classes}
            />
            <Select
              mt="md"
              comboboxProps={{ withinPortal: true }}
              data={['React', 'Angular', 'Svelte', 'Vue']}
              placeholder="All Matches"
              radius={"lg"}
              // classNames={classes}
            />
            <Select
              mt="md"
              comboboxProps={{ withinPortal: true }}
              data={['React', 'Angular', 'Svelte', 'Vue']}
              placeholder="All Time"
              radius={"lg"}
              // classNames={classes}
            />
          </Flex>

          <Space />

          <Grid columns={10} mt={"40px"} p={"10px"}>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 5, md: 10 }}>
              <Flex gap={"xs"} p={"xs"} style={{ borderRadius: "30px" }} bg={"#1d1d1d"}>
                <Text fz={"sm"} c={"blue"}>Rating 1.0 -</Text>
                <Text fz={"sm"}>1.24</Text>
              </Flex>
            </Grid.Col>
          </Grid>

        </Card>
    )
}