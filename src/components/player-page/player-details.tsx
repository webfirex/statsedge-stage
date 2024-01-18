import { 
    Box,
    Card,
    Grid,
    Image,
    Text,
    Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";
import { CircleFlag } from "react-circle-flags";



export function PlayerDetails() {

    const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)
    const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`)

    return (
        <>
            <Card p={"md"} radius={"md"} w={"300px"} style={{ 
                backgroundColor: "transparent",
                border: "1px solid #fff",
            }}>
                <Grid columns={10}>
                    <Grid.Col span={{ base: 7, md: 7 }}>
                        <Title order={3} tt={"uppercase"}>S1MPLE</Title>
                        <Text fz={"xs"} w={"100%"} opacity={"0.5"}>Oleksandr Kostyliev</Text>
                        <Box display={"flex"} mt={"xs"} style={{ gap: "8px", alignItems: "center", }}>
                            <CircleFlag countryCode="" height={BigThenXs ? 25 : 15} />
                            <Box p={"5"} bg={"black"} display={"flex"} style={{ borderRadius: "10px", }}>
                                <Image
                                  src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                                  alt="league logo"
                                  fit="contain"
                                  h={BigThenXs ? 20 : 15}
                                />
                                <Text fz={"xs"}>Team Name</Text>
                            </Box>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={{ base: 3, md: 3 }}>
                        <Card display={"flex"} p={"5"} pl={"10"} style={{ flexDirection: "row", gap: "10px", }}>
                            <Text fz={"xs"}>LOL</Text>
                            <Image
                              src={"/lol.svg"}
                              mah={BigThenMd ? 20 : 15}
                              alt={""}
                              fit="contain"
                            />
                        </Card>
                    </Grid.Col>
                </Grid>
            </Card>
        </>
    )

}