import { Button, Card, Container, Grid, Group, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";

export function LandingCOACard() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <>
      <Card mx="xl" radius="lg" py="xl" px={BigThenMd ? "xl" : "xs"}>
        <Container size="xl">
          <Grid columns={10}>
            <Grid.Col span={{ base: 10, md: 7 }}>
              <Title
                order={BigThenMd ? 2 : 4}
                ta={BigThenMd ? "left" : "center"}
                tt="uppercase"
              >
                Sign up today and unlock the power of esports data!
              </Title>
            </Grid.Col>

            <Grid.Col span={{ base: 10, md: 3 }}>
              <Group justify="center" align="center" h="100%">
                <Button radius="xl" size="md">
                  Join Now!
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Card>
    </>
  );
}
