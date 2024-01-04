import {
  ActionIcon,
  Anchor,
  AppShellHeader,
  Button,
  Group,
  Menu,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { LogoIcon, LogoIconSm } from "../logo/icon";
import { IconSearch } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export function CommonHeader() {
  const BiggerThan431 = useMediaQuery("(min-width: 431px)");

  if (!BiggerThan431) {
    return (
      <>
        <AppShellHeader withBorder={false} py="xl" px="xs">
          <Group justify="space-between">
            <Group gap={rem(10)}>
              <LogoIconSm />

              <Group gap={rem(10)}>
                <Anchor c="white" td="none" size="sm">
                  Matches
                </Anchor>

                <Anchor c="white" td="none" size="sm">
                  Props
                </Anchor>

                <Menu
                  shadow="md"
                  width={200}
                  position="bottom-start"
                  withArrow
                  styles={{
                    dropdown: {
                      border: "none",
                    },

                    arrow: {
                      border: "none",
                    },
                  }}
                >
                  <Menu.Target>
                    <Anchor c="white" td="none" size="sm">
                      Tools
                    </Anchor>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item>DFS Optimizer</Menu.Item>

                    <Menu.Item>DFS Middling</Menu.Item>

                    <Menu.Item>DFS Correlations</Menu.Item>

                    <Menu.Item>DFS Ownership</Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <Anchor c="green" td="underline" size="sm">
                  Bonuses
                </Anchor>
              </Group>
            </Group>

            <Group>
              <ActionIcon variant="transparent" size="xs" c="gray.7">
                <IconSearch size={16} />
              </ActionIcon>

              <Button
                size="xs"
                variant="outline"
                styles={{
                  root: {
                    boxShadow: "0px 4px 150px 0px #1864AB",
                  },
                }}
              >
                <Text size="xs" c="white">
                  Login
                </Text>
              </Button>
            </Group>
          </Group>
        </AppShellHeader>
      </>
    );
  }

  return (
    <>
      <AppShellHeader withBorder={false} p="xl" px="xl">
        <Group justify="space-between">
          <Group gap={rem(70)}>
            <Group>
              <LogoIcon />

              <Text tt="uppercase" size={rem(25)}>
                stats
                <Text span c="blue" inherit>
                  edge
                </Text>
              </Text>
            </Group>

            <Group gap={rem(60)}>
              <Anchor c="white" td="none">
                Matches
              </Anchor>

              <Anchor c="white" td="none">
                Props
              </Anchor>

              <Menu
                shadow="md"
                width={200}
                position="bottom-start"
                withArrow
                styles={{
                  dropdown: {
                    border: "none",
                  },

                  arrow: {
                    border: "none",
                  },
                }}
              >
                <Menu.Target>
                  <Anchor c="white" td="none">
                    Tools
                  </Anchor>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item>DFS Optimizer</Menu.Item>

                  <Menu.Item>DFS Middling</Menu.Item>

                  <Menu.Item>DFS Correlations</Menu.Item>

                  <Menu.Item>DFS Ownership</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Anchor c="green" td="underline">
                Bonuses
              </Anchor>
            </Group>
          </Group>

          <Group>
            <TextInput
              leftSection={<IconSearch size={18} />}
              variant="filled"
              placeholder="Search player, team.."
              size="md"
            />

            <Button
              size={"md"}
              px={"xl"}
              variant="outline"
              styles={{
                root: {
                  boxShadow: "0px 4px 150px 0px #1864AB",
                },
              }}
            >
              <Text size="sm" c="white">
                Login
              </Text>
            </Button>
          </Group>
        </Group>
      </AppShellHeader>
    </>
  );
}
