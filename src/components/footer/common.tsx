import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LogoIcon } from "../logo/icon";
import {
  IconBrandDiscordFilled,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitterFilled,
} from "@tabler/icons-react";

export function CommonFooter() {
  const BigThenSm = useMediaQuery("(min-width: 48em)");

  return (
    <>
      <Box bg="#000" {...(BigThenSm ? { p: "xl" } : { py: "xl" })}>
        <Stack>
          <Container w="100%" size="xl">
            <SimpleGrid
              cols={{
                base: 1,
                sm: 4,
              }}
            >
              <Stack justify="center">
                <Group justify={BigThenSm ? "left" : "center"}>
                  <LogoIcon />

                  <Text tt="uppercase" size={rem(25)}>
                    stats
                    <Text
                      span
                      c="blue"
                      inherit
                      style={{
                        textShadow: "0px 0px 30px var(--mantine-color-blue-9)",
                      }}
                    >
                      edge
                    </Text>
                  </Text>
                </Group>

                <Text
                  size="sm"
                  {...(BigThenSm
                    ? { mx: "auto" }
                    : { mx: "auto", ta: "center", maw: 250 })}
                >
                  Ed ut perspiciatis unde omnis iste natus error sit voluptatem
                </Text>

                {!BigThenSm && <Divider size="sm" />}
              </Stack>

              <Stack gap="xs" {...(BigThenSm ? { mx: "auto" } : {})}>
                <Text>Analytics</Text>

                <Anchor size="sm" className="link-white">
                  Guides
                </Anchor>

                <Anchor className="link-white" size="sm">
                  F.A.Q
                </Anchor>
              </Stack>

              <Stack gap="xs" {...(BigThenSm ? { mx: "auto" } : {})}>
                <Text>More</Text>

                <Anchor className="link-white" size="sm">
                  Terms of service
                </Anchor>

                <Anchor className="link-white" size="sm">
                  Privacy policy
                </Anchor>

                <Anchor className="link-white" size="sm">
                  Feedback
                </Anchor>
              </Stack>

              <Stack gap="xs" {...(BigThenSm ? { ml: "auto" } : {})}>
                <Text>Contact us</Text>

                <Anchor className="link-white" size="sm">
                  support@mail.com
                </Anchor>

                <Group>
                  <Anchor c="white">
                    <IconBrandTwitterFilled size={18} />
                  </Anchor>

                  <Anchor c="white">
                    <IconBrandInstagram size={18} />
                  </Anchor>

                  <Anchor c="white">
                    <IconBrandDiscordFilled size={18} />
                  </Anchor>

                  <Anchor c="white">
                    <IconBrandFacebook size={18} />
                  </Anchor>
                </Group>
              </Stack>
            </SimpleGrid>
          </Container>

          <Divider size="sm" />

          <Text ta="center" c="dimmed">
            © 2023 logo Inc. All rights reserved.
          </Text>
        </Stack>
      </Box>
    </>
  );
}
