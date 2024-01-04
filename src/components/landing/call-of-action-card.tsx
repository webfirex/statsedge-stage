import {
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function LandingCOACard() {
  const BiggerThan431 = useMediaQuery("(min-width: 431px)");

  return (
    <>
      <Card mx="xl" radius="lg">
        <Container>
          <SimpleGrid
            cols={{
              base: 1,
              md: 2,
            }}
          >
            <Title ta={BiggerThan431 ? "left" : "center"}>
              Sign up today and unlock the power of esports data!
            </Title>

            <Group justify="center">
              <Button radius="xl" size="md">
                Join Now!
              </Button>
            </Group>
          </SimpleGrid>
        </Container>
      </Card>
    </>
  );
}
