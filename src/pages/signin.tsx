import { Modal, RemoveScroll } from "@mantine/core";
import { LayoutComp } from "~/components/layout";
import { SigninCard } from "~/components/signin-modal";

export default function Signin() {
  return (
    <>
      <Modal
        opened
        onClose={() => {
          return;
        }}
        withCloseButton={false}
        p={0}
        styles={{
          body: {
            padding: 0,
          },
        }}
        size="auto"
        centered
        overlayProps={{
          backgroundOpacity: 0.7,
          blur: 7,
        }}
      >
        <RemoveScroll>
          <SigninCard />
        </RemoveScroll>
      </Modal>
      <LayoutComp>.</LayoutComp>
    </>
  );
}
