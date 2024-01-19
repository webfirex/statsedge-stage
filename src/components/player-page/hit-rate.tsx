import { Card, Flex, Box, Title, Text, Select } from "@mantine/core";
import { datax } from "~/pages/api/charts/bar";
import { BarChart } from '@mantine/charts';
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";

interface HitRateProps {
  sport: string | undefined;
}

export default function HitRate(props: HitRateProps) {
    const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)

    return (
        <Card p={"20px"} style={{ backgroundImage: props.sport === 'cs2' ? "url(/map-blur.png)" : "none", display: "flex", flexDirection: "column"}}>
          <Flex justify={"space-between"} direction={BigThenMd ? "row" : "column"} gap={"15px"}>
            <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Title tt={"uppercase"} order={4}>Hit Rate</Title>
              <Text fz={"sm"}>S1mple (Navi)</Text>
            </Box>
            <Box style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: BigThenMd ? "end" : "start" }}>
              <Select
                maw={150}
                comboboxProps={{ withinPortal: true }}
                data={['Map 1', 'Map 2', 'Map 3', 'Map 4']}
                placeholder="All Maps"
                radius={"lg"}
                // classNames={classes}
              />
              <Box miw={BigThenMd ? "300" : "200"} p={BigThenMd ? "sm" : "xs"} display={props.sport === 'cs2' ? "flex" : "none"} style={{ justifyContent: BigThenMd ? "end" : "start", backgroundImage: "url(/map.png)", backgroundPosition: "center left", borderRadius: "30px" }}>Map 1</Box>
            </Box>
          </Flex>
          <BarChart
            h={300}
            mt={"lg"}
            referenceLines={[
              {
                y: 20,
                color: 'blue',
              },
            ]}
            data={datax}
            dataKey="key"
            type="stacked"
            styles={{ bar: { borderRadius: "30px" } }}
            withTooltip={false}
            series={[
              { name: 'Smartphones', color: 'green' },
            ]}
          />
        </Card>
    )
}