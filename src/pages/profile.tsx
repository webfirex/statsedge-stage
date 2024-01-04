import { SignOutButton, useUser } from "@clerk/nextjs";
import { Center, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { LayoutComp } from "~/components/layout";

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
        <SignOutButton />
      </LayoutComp>
    </>
  );
}
