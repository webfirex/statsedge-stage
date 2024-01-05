import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconKey, IconTicket, IconUserCircle } from "@tabler/icons-react";

export function ProfileSettingCard() {
  return (
    <>
      <Grid columns={10}>
        <Grid.Col span={7}>
          <Card p="lg">
            <Stack>
              <Stack w="fit-content" gap={4}>
                <Group gap="xs">
                  <Title order={5}>Edit Profile</Title>

                  <IconUserCircle size={18} />
                </Group>

                <Divider size="md" color="blue" />
              </Stack>

              <form>
                <Stack>
                  <Group grow>
                    <TextInput
                      radius="xl"
                      placeholder="First Name"
                      label="First Name"
                    />
                    <TextInput
                      radius="xl"
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </Group>

                  <TextInput radius="xl" placeholder="Email" label="Email" />

                  <Group>
                    <Button size="xs" px="xl">
                      <Text size="sm">Save</Text>
                    </Button>
                  </Group>
                </Stack>
              </form>

              <Space />

              <Stack w="fit-content" gap={4}>
                <Group gap="xs">
                  <Title order={5}>Change Password</Title>

                  <IconKey size={18} />
                </Group>

                <Divider size="md" color="blue" />
              </Stack>

              <form>
                <Stack>
                  <PasswordInput
                    radius="xl"
                    placeholder="Password"
                    label="Old Password"
                  />

                  <Group grow>
                    <PasswordInput
                      radius="xl"
                      placeholder="Password"
                      label="New Password"
                    />
                    <PasswordInput
                      radius="xl"
                      placeholder="Password"
                      label="Confirm Password"
                    />
                  </Group>

                  <Group>
                    <Button size="xs" px="xl">
                      <Text size="sm">Change</Text>
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card p="lg">
            <Stack>
              <Stack w="fit-content" gap={4}>
                <Group gap="xs">
                  <Title order={5}>Manage Subscriptions</Title>

                  <IconTicket size={18} />
                </Group>

                <Divider size="md" color="blue" />
              </Stack>

              <Text size="sm">
                Manage billing information, payment methods and cancel
                subscription
              </Text>

              <Group>
                <Button size="xs">
                  <Text size="sm">Manage Subscriptions</Text>
                </Button>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
