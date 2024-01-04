import { Flex } from "@mantine/core";
import { LayoutComp } from "~/components/layout";
import { SignupCard } from "~/components/signup-modal";

export default function Signup() {
  return (
    <>
      <LayoutComp>
        <Flex justify="center" my="xl">
          <SignupCard />
        </Flex>
      </LayoutComp>
    </>
  );
}
