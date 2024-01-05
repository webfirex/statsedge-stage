import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  PasswordInput,
  SimpleGrid,
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
        <Grid.Col span={{ base: 10, md: 7 }}>
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
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
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

                    <TextInput radius="xl" placeholder="Email" label="Email" />
                  </SimpleGrid>

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
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <PasswordInput
                      radius="xl"
                      placeholder="Password"
                      label="Old Password"
                    />
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
                  </SimpleGrid>

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

        <Grid.Col span={{ base: 10, md: 3 }}>
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
