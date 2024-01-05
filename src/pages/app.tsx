import { useUser } from "@clerk/nextjs";
import { Center, Container, Group, Loader, Stack, Text } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { AppGameSelector } from "~/components/app-page/game-selector";
import { LayoutComp } from "~/components/layout";
import { SelectedGameAtom } from "~/lib/jotai";

export default function App() {
  const { isSignedIn, isLoaded: UserIsLoaded } = useUser();

  const SelectedGame = useAtomValue(SelectedGameAtom);

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
        <Container size="xl" mt="xl">
          <Stack>
            <AppGameSelector />

            <Group gap="xs">
              <Text c="blue" size="xl">
                /
              </Text>

              <Text tt="uppercase">{SelectedGame}</Text>
            </Group>
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
