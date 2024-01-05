import {
  AspectRatio,
  Container,
  Image,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Children } from "react";
import { BREAKPOINTS } from "~/styles/globals";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

function FeatureCard(props: FeatureCardProps) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <>
      <Stack
        gap="xs"
        mb={!BigThenMd ? 0 : props.index === 1 ? "xl" : 0}
        mt={!BigThenMd ? 0 : props.index === 1 ? 0 : "xl"}
      >
        <AspectRatio ratio={15 / 8}>
          <Image src={props.image} alt={props.title} fit="contain" />
        </AspectRatio>

        <Space h="md" />

        <Title order={5} ta={BigThenMd ? "left" : "center"}>
          {props.title}
        </Title>

        <Text c="dimmed" size="sm" ta={BigThenMd ? "left" : "center"}>
          {props.description}
        </Text>
      </Stack>
    </>
  );
}

const FeatureList = [
  {
    image: "/f3.webp",
    title: "Historical Stats",
    description:
      "From the names of the matches - to the weapons used to commit each murder.",
  },
  {
    image: "/f1.webp",
    title: "Live game scores and stats",
    description:
      "From first seasons to live games - always up-to-date information.",
  },
  {
    image: "/f2.webp",
    title: "Fantasy Tools",
    description:
      "Calendar of all upcoming matches and information about them, as well as data on past matches.",
  },
];

export function LandingFeaturesComp() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Title
          ta="center"
          mx="auto"
          order={BigThenMd ? 1 : 3}
          
          maw={900}
          tt="uppercase"
        >
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
            FeatureList.map((feature, findex) => (
              <FeatureCard {...feature} index={findex} />
            ))
          )}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
