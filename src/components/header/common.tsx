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
import { BREAKPOINTS } from "~/styles/globals";
import { useSetAtom } from "jotai";
import { AuthModalAtom } from "~/lib/jotai";

export function CommonHeader() {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const setAuthModal = useSetAtom(AuthModalAtom);

  return (
    <>
      <AppShellHeader
        withBorder={false}
        {...(BigThenXs ? { px: "xl" } : { px: "xs" })}
      >
        <Group justify="space-between" py="auto" h="100%">
          <Group gap={BigThenMd ? rem(40) : rem(10)}>
            <Group>
              {BigThenXs ? <LogoIcon /> : <LogoIconSm />}

              {BigThenMd && (
                <Text tt="uppercase" size={rem(25)}>
                  stats
                  <Text span c="blue" inherit>
                    edge
                  </Text>
                </Text>
              )}
            </Group>

            <Group gap={BigThenMd ? rem(40) : rem(10)}>
              <Anchor c="white" td="none" size={BigThenMd ? "md" : "sm"}>
                Matches
              </Anchor>

              <Anchor c="white" td="none" size={BigThenMd ? "md" : "sm"}>
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
                  <Anchor c="white" td="none" size={BigThenMd ? "md" : "sm"}>
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

              <Anchor c="green" td="underline" size={BigThenMd ? "md" : "sm"}>
                Bonuses
              </Anchor>
            </Group>
          </Group>

          <Group>
            {BigThenMd ? (
              <TextInput
                placeholder="Search player, team..."
                size="md"
                variant="filled"
                leftSection={<IconSearch size={18} />}
              />
            ) : (
              <ActionIcon variant="transparent" size="xs" c="gray.7">
                <IconSearch size={16} />
              </ActionIcon>
            )}

            <Button
              size={BigThenMd ? "md" : "xs"}
              variant="outline"
              px={BigThenMd ? "xl" : "xs"}
              styles={{
                root: {
                  boxShadow: "0px 4px 150px 0px #1864AB",
                },
              }}
              onClick={() => setAuthModal("signin")}
            >
              <Text size={BigThenMd ? "sm" : "xs"} c="white">
                Login
              </Text>
            </Button>
          </Group>
        </Group>
      </AppShellHeader>
    </>
  );
}
