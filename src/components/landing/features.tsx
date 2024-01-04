import {
  AspectRatio,
  Container,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Children } from "react";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

function FeatureCard(props: FeatureCardProps) {
  const BiggerThan431 = useMediaQuery("(min-width: 431px)");

  return (
    <>
      <Stack gap="xs">
        <AspectRatio ratio={15 / 8}>
          <Image src={props.image} alt={props.title} fit="contain" />
        </AspectRatio>

        <Title order={3} ta={BiggerThan431 ? "left" : "center"}>
          {props.title}
        </Title>

        <Text c="dimmed" size="sm" ta={BiggerThan431 ? "left" : "center"}>
          {props.description}
        </Text>
      </Stack>
    </>
  );
}

const FeatureList = [
  {
    image: "/f3.png",
    title: "Historical Stats",
    description:
      "From the names of the matches - to the weapons used to commit each murder.",
  },
  {
    image: "/f1.png",
    title: "Live game scores and stats",
    description:
      "From first seasons to live games - always up-to-date information.",
  },
  {
    image: "/f2.png",
    title: "Fantasy Tools",
    description:
      "Calendar of all upcoming matches and information about them, as well as data on past matches.",
  },
];

export function LandingFeaturesComp() {
  return (
    <Container>
      <Stack>
        <Title ta="center" maw={600} mx="auto">
          <Text span inherit c="blue">
            Win more!
          </Text>{" "}
          USE OUR STATS TO YOUR ADVANTAGE AND FIND AN EDGE
        </Title>

        <SimpleGrid
          cols={{
            base: 1,
            lg: 3,
          }}
        >
          {Children.toArray(
            FeatureList.map((feature) => <FeatureCard {...feature} />)
          )}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
