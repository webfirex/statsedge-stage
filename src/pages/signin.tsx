import { Flex } from "@mantine/core";
import { LayoutComp } from "~/components/layout";
import { SigninCard } from "~/components/signin-modal";

export default function Signin() {
  return (
    <>
      <LayoutComp>
        <Flex justify="center" my="xl">
          <SigninCard />
        </Flex>
      </LayoutComp>
    </>
  );
}
