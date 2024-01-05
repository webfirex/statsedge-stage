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
import { useState } from "react";

export function CommonHeader() {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const router = useRouter();

  const [SearchBar, setSearchBar] = useState(false);

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
              {BigThenMd ? <LogoIcon /> : <LogoIconSm />}

              {BigThenMd && (
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
              )}
            </Group>

            {!SearchBar && (
              <Group gap={BigThenMd ? rem(40) : rem(10)}>
                <Anchor
                  c={router.pathname === "/matches" ? "blue" : "white"}
                  td={router.pathname === "/matches" ? "underline" : "none"}
                  size={BigThenMd ? "md" : "xs"}
                  component={Link}
                  href="/matches"
                >
                  Matches
                </Anchor>

                <Anchor c="white" td="none" size={BigThenMd ? "md" : "xs"}>
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
                    <Anchor c="white" td="none" size={BigThenMd ? "md" : "xs"}>
                      Tools ▾
                    </Anchor>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item>DFS Optimizer</Menu.Item>

                    <Menu.Item>DFS Middling</Menu.Item>

                    <Menu.Item>DFS Correlations</Menu.Item>

                    <Menu.Item>DFS Ownership</Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    cursor: "pointer",
                    width: "fit-content",
                    height: "fit-content",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "50%",
                      width: "100%",
                      height: "1px",
                      borderRadius: "50%",
                      transform: "translate(50%, -50%)",
                      backgroundColor: "var(--mantine-color-teal-9)",
                      zIndex: 0,
                      boxShadow:
                        "0px 0px 45px 20px var(--mantine-color-teal-9)",
                      opacity: 0.5,
                    }}
                  />

                  <Anchor
                    c="green"
                    td="underline"
                    size={BigThenMd ? "md" : "xs"}
                    style={{
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    Bonuses
                  </Anchor>
                </div>
              </Group>
            )}
          </Group>

          <Group justify="end">
            {SearchBar && !BigThenMd && (
              <TextInput
                placeholder="Search player, team..."
                size="xs"
                variant="filled"
              />
            )}

            {BigThenMd ? (
              <TextInput
                placeholder="Search player, team..."
                size="md"
                variant="filled"
                leftSection={<IconSearch size={18} />}
              />
            ) : (
              <ActionIcon
                variant="transparent"
                size="xs"
                c="gray.7"
                onClick={() => setSearchBar(!SearchBar)}
              >
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
                      href="/?signin=true"
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
                      <Avatar
                        src={user.imageUrl}
                        radius="sm"
                        size={BigThenMd ? "md" : "sm"}
                      />
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item component={Link} href="/profile">
                        Profile
                      </Menu.Item>

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
