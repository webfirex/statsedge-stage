import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function LandingCOACard() {
  const BiggerThan431 = useMediaQuery("(min-width: 431px)");

  return (
    <>
      <Card mx="xl" radius="lg" p="xl">
        <Container size="xl">
          <Grid columns={10}>
            <Grid.Col span={7}>
              <Title order={2} ta={BiggerThan431 ? "left" : "center"}>
                Sign up today and unlock the power of esports data!
              </Title>
            </Grid.Col>

            <Grid.Col span={3}>
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
