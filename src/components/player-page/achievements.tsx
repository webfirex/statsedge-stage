import { 
    Box,
    Card,
    Text,
} from "@mantine/core";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";

export function Achievements() {

    const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)
    
    return (
        <>
            <Card display={"flex"} p={"sm"} radius={"md"} w={"300px"} style={{ 
                backgroundColor: "transparent",
                flexDirection: "column",
                alignItems: BigThenMd ? "flex-end" : "flex-start",
                gap: "5px",
            }}>
               <Text>PLAYER ACHIEVEMENTS</Text> 
               <Box display={"flex"} style={{ gap: "5px", flexWrap: "wrap", }}>
                    <Text fz={"xs"} p={"5"} bg={"#695D05"} style={{ borderRadius: "7px", }}>Player Achievement 1</Text>
                    <Text fz={"xs"} p={"5"} bg={"#695D05"} style={{ borderRadius: "7px", }}>Player Achievement 1</Text>
               </Box>
               <Box display={"flex"} style={{ gap: "5px", flexWrap: "wrap", }}>
                    <Text fz={"xs"} p={"5"} bg={"#1d1d1d"} style={{ borderRadius: "7px", }}>Player Achievement 2</Text>
               </Box>
            </Card>
        </>
    )

}
