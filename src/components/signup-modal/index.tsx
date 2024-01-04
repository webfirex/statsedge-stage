import {
  Button,
  Divider,
  Group,
  Modal,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useAtom } from "jotai";
import { AuthModalAtom } from "~/lib/jotai";
import { LogoIconSm } from "../logo/icon";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";

export function SignupModal() {
  const [AuthModal, setAuthModal] = useAtom(AuthModalAtom);

  return (
    <>
      <Modal
        opened={AuthModal === "signup"}
        onClose={() => setAuthModal(null)}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered
        withCloseButton={false}
      >
        <Stack align="center" px="xl" gap={0} py="md">
          <Group>
            <LogoIconSm />

            <Text tt="uppercase" size={rem(25)}>
              stats
              <Text span c="blue" inherit>
                edge
              </Text>
            </Text>
          </Group>

          <Space h="md" />

          <Title order={4}>Welcome to Stats Edge</Title>

          <Space h="md" />

          <Text c="dimmed" ta="center" size="sm">
            Join Millions of other e-sports fans and stay up to date with the
            latest news, results and discussions
          </Text>

          <Space h="md" />

          <Divider size="sm" />

          <Space h="xs" />

          <TextInput
            w="100%"
            variant="default"
            label="Email"
            placeholder="Enter Email Address"
          />

          <Space h="xs" />

          <PasswordInput
            w="100%"
            variant="default"
            label="Password"
            placeholder="Enter Password"
          />

          <Space h="xs" />

          <PasswordInput
            w="100%"
            variant="default"
            label="Confirm Password"
            placeholder="Re-Enter Password"
          />

          <Space h="xs" />

          <Space h="xs" />

          <Group justify="end" w="100%">
            <Text size="sm" fw="bold" c="blue" component={Link} href="#">
              Already have an account ?
            </Text>
          </Group>

          <Space h="xs" />

          <Button variant="outline" fullWidth color="dark">
            <Text size="sm" fw="bold" c="dimmed">
              Sign up
            </Text>
          </Button>

          <Space h="xs" />

          <Divider label="OR" size="sm" />

          <Space h="xs" />

          <Button
            fullWidth
            leftSection={<IconBrandGoogleFilled size={20} />}
            variant="white"
          >
            <Text size="sm" fw="bold" c="dark.9">
              Continue with Google
            </Text>
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
