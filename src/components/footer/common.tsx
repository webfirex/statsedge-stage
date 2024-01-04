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
          <Container w="100%">
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
                    <Text span c="blue" inherit>
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

                <Text c="dimmed" size="sm">
                  Guides
                </Text>

                <Text c="dimmed" size="sm">
                  F.A.Q
                </Text>
              </Stack>

              <Stack gap="xs" {...(BigThenSm ? { mx: "auto" } : {})}>
                <Text>More</Text>

                <Text c="dimmed" size="sm">
                  Terms of service
                </Text>

                <Text c="dimmed" size="sm">
                  Privacy policy
                </Text>

                <Text c="dimmed" size="sm">
                  Feedback
                </Text>
              </Stack>

              <Stack gap="xs" {...(BigThenSm ? { mx: "auto" } : {})}>
                <Text>Contact us</Text>

                <Text c="dimmed" size="sm">
                  support@mail.com
                </Text>

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
