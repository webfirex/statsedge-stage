import {
  ActionIcon,
  Anchor,
  AppShellHeader,
  Avatar,
  Button,
  Group,
  Loader,
  Menu,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { LogoIcon, LogoIconSm } from "../logo/icon";
import { IconSearch } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignOutButton, useUser } from "@clerk/nextjs";

export function CommonHeader() {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const router = useRouter();

  const { isSignedIn, isLoaded: UserIsLoaded, user } = useUser();

  return (
    <>
      <AppShellHeader
        withBorder={false}
        {...(BigThenXs ? { px: "xl" } : { px: "xs" })}
      >
        <Group justify="space-between" py="auto" h="100%">
          <Group gap={BigThenMd ? rem(40) : rem(10)}>
            <Group
              onClick={() => router.push("/")}
              style={{
                cursor: "pointer",
              }}
            >
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

            {(() => {
              if (!UserIsLoaded) {
                return (
                  <>
                    <Loader />
                  </>
                );
              }

              if (!isSignedIn || !user) {
                return (
                  <>
                    <Button
                      size={BigThenMd ? "md" : "xs"}
                      variant="outline"
                      px={BigThenMd ? "xl" : "xs"}
                      styles={{
                        root: {
                          boxShadow: "0px 4px 150px 0px #1864AB",
                        },
                      }}
                      component={Link}
                      href="/signin"
                    >
                      <Text size={BigThenMd ? "sm" : "xs"} c="white">
                        Login
                      </Text>
                    </Button>
                  </>
                );
              }

              return (
                <>
                  <Menu
                    shadow="md"
                    width={200}
                    position="bottom-end"
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
                      <Avatar src={user.imageUrl} radius="sm" />
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>Application</Menu.Label>
                      <Menu.Item component={Link} href="/app">
                        Home
                      </Menu.Item>

                      <Menu.Item component={Link} href="/profile">
                        Profile
                      </Menu.Item>

                      <Menu.Label>Danger</Menu.Label>

                      <SignOutButton>
                        <Menu.Item c="red">Logout</Menu.Item>
                      </SignOutButton>
                    </Menu.Dropdown>
                  </Menu>
                </>
              );
            })()}
          </Group>
        </Group>
      </AppShellHeader>
    </>
  );
}
