import { Box, Button, Flex, Grid, Select, Title } from "@mantine/core";
import { FadeUpAni } from "../animation/fade-up";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";

export default function MainFilters () {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`)
    return (
        <>
        <FadeUpAni>
        <Grid columns={10} mt={"md"}>
          <Grid.Col span={{ base: 10, md: 5 }} py={"md"}>
            <Title order={5}>RECENT FORM</Title>
            <div style={{
              borderRadius: "30px",
              gap: "5px",
              padding: "5px",
              marginTop: "15px",
              display: "flex",
              backgroundColor: "#1d1d1d",
              width: "100%",
              maxWidth: "500px",
            }}>
              <Button fz={"sm"} style={{
                padding: "10px",
                width: "100%",
                borderRadius: "30px",
                backgroundColor: "transparent",
              }}>Kills</Button>
              <Button fz={"sm"} style={{
                padding: "10px",
                width: "100%",
                borderRadius: "30px",
                backgroundColor: "transparent",
              }}>Deaths</Button>
              <Button fz={"sm"} style={{
                padding: "10px",                
                width: "100%",
                borderRadius: "30px",
                backgroundColor: "transparent",
              }}>Assists</Button>
              <Button fz={"sm"} style={{
                padding: "10px",
                width: "100%",
                borderRadius: "30px",
                backgroundColor: "#426CFF",
              }}>Headshots</Button>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 10, md: 5 }}>
            
            <Flex gap={"sm"} justify={BigThenMd ? "flex-end" : "flex-start"} wrap={"wrap"}>

            <Box>
            <Title order={5}>GAMES</Title>
            <div style={{
              borderRadius: "30px",
              gap: "5px",
              padding: "5px",
              marginTop: "15px",
              display: "flex",
              backgroundColor: "#1d1d1d",
              width: "fit-content"
            }}>
              <Button fz={"sm"} style={{
                padding: "10px 25px",
                borderRadius: "30px",
                backgroundColor: "transparent",
              }}>VS</Button>
              <Button fz={"sm"} style={{
                padding: "10px 25px",
                borderRadius: "30px",
                backgroundColor: "transparent",
              }}>L30</Button>
              <Button fz={"sm"} style={{
                padding: "10px 25px",
                borderRadius: "30px",
                backgroundColor: "transparent",
              }}>L10</Button>
              <Button fz={"sm"} style={{
                padding: "10px 25px",
                borderRadius: "30px",
                backgroundColor: "#426CFF",
              }}>L5</Button>
            </div>
            </Box>
            
            <Box>
            <Title order={5}>OUTCOME</Title>
            <div style={{
              borderRadius: "30px",
              gap: "5px",
              padding: "5px",
              marginTop: "15px",
              display: "flex",
              backgroundColor: "#1d1d1d",
              width: "fit-content"
            }}>
              <Button fz={"sm"} style={{
                padding: "10px 25px",
                borderRadius: "30px",
                backgroundColor: "transparent",
              }}>Loss</Button>
              <Button fz={"sm"} style={{
                padding: "10px 25px",
                borderRadius: "30px",
                backgroundColor: "transparent",
              }}>Win</Button>
              <Button fz={"sm"} style={{
                padding: "10px 25px",
                borderRadius: "30px",
                backgroundColor: "#426CFF",
              }}>Both</Button>
            </div>
            </Box>

            </Flex>

          </Grid.Col>
        </Grid>
        </FadeUpAni>

        <FadeUpAni>
          <Flex gap={"sm"} py={"md"}>
            <Box>
              <Title order={5}>EVENT</Title>
              <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={['React', 'Angular', 'Svelte', 'Vue']}
                placeholder="Event Type"
                radius={"lg"}
                // classNames={classes}
              />
            </Box>
            <Box>
              <Title order={5}>MAPS</Title>
              <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={['React', 'Angular', 'Svelte', 'Vue']}
                placeholder="All Maps"
                radius={"lg"}
                // classNames={classes}
              />
            </Box>
          </Flex>
        </FadeUpAni>
        </>
    )
}