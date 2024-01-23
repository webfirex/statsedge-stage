import { 
    Box,
    Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";

export function RoleRow() {

    const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)

    return (
        <>
            <Box display={"flex"} style={{
                borderTop: "1px solid #fff",
                borderBottom: "1px solid #fff",
                justifyContent: BigThenMd ? "flex-start" : "space-between",
                marginTop: "15px",
                padding: "10px",
                gap: BigThenMd ? "50px" : "0",
            }}>
                <Text>ROLE: SNIPER</Text>
                <Text>Top 20 (#5)</Text>
                <Text>27 yrs</Text>
            </Box>
        </>
    )

}