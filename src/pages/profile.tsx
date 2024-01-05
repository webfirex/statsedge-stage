import { useUser } from "@clerk/nextjs";
import {
  Center,
  Container,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { LayoutComp } from "~/components/layout";
import { ProfileHeroComp } from "~/components/profile-page/hero";
import { ProfileSettingCard } from "~/components/profile-page/setting-card";

export default function App() {
  const { isSignedIn, isLoaded: UserIsLoaded } = useUser();

  const router = useRouter();

  if (!UserIsLoaded) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  if (!isSignedIn) {
    void router.push("/signin");

    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <LayoutComp>
        <Container size="xl">
          <Stack>
            <ProfileHeroComp />

            <Group gap="xs">
              <Text c="blue" size="xl">
                /
              </Text>

              <Text>User Profile</Text>
            </Group>

            <Group>
              <Title order={3}>
                <Text span inherit c="yellow" td="underline">
                  Account
                </Text>{" "}
                Settings
              </Title>
            </Group>

            <Space />

            <ProfileSettingCard />
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
