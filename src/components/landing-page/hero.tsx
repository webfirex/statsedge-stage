import {
  Box,
  Button,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";
import { FadeRightAni } from "../animation/fade-right";
import { FadeUpAni } from "../animation/fade-up";
import { ZoomOutAni } from "../animation/zoom.out";

export function LandingHeroComp() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <>
      <Box
        w="100vw"
        h="fit-content"
        style={{
          backgroundImage: "url(/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          w="100%"
          h="100%"
          py={rem(100)}
          // px={BigThenMd ? rem(100) : rem(20)}
          style={{
            background: BigThenMd
              ? "linear-gradient( 90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%)"
              : "linear-gradient( 180deg, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0) 100%)",

            backdropFilter: "blur(5.5px)",
          }}
        >
          <Container size="xl">
            <SimpleGrid
              cols={{
                base: 1,
                md: 2,
              }}
            >
              <Stack maw={650} gap="xl" m="auto">
                <FadeRightAni>
                  <Title
                    ta={BigThenMd ? "left" : "center"}
                    tt="uppercase"
                    order={BigThenMd ? 1 : 3}
                  >
                    Your{" "}
                    <Text span inherit c="blue">
                      ultimate destination
                    </Text>{" "}
                    for pro esports stats
                  </Title>
                </FadeRightAni>

                <FadeRightAni>
                  <Text
                    c="dimmed"
                    ta={BigThenMd ? "left" : "center"}
                    size={BigThenMd ? "xl" : "md"}
                  >
                    We provide you with the most comprehensive and up-to-date
                    stats for professional esports players in popular games like
                    CSGO, Dota 2, and League of Legends.
                  </Text>
                </FadeRightAni>

                <FadeUpAni>
                  <Group gap="xl" justify={BigThenMd ? "left" : "center"}>
                    <Button
                      radius="xl"
                      tt="uppercase"
                      size={BigThenMd ? "lg" : "md"}
                    >
                      Try it for free!
                    </Button>

                    <Stack gap={0}>
                      <Title lh={rem(55)} ta={BigThenMd ? "left" : "center"}>
                        +200,000
                      </Title>

                      <Text
                        tt="capitalize"
                        c="dimmed"
                        ta={BigThenMd ? "left" : "right"}
                        size={BigThenMd ? "xl" : "md"}
                      >
                        matches analyzed in 5 days
                      </Text>
                    </Stack>
                  </Group>
                </FadeUpAni>
              </Stack>

              <ZoomOutAni>
                <Image src="/hero-ex.webp" mah={400} fit="contain" alt="hero" />
              </ZoomOutAni>
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
