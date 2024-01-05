import { Modal, RemoveScroll } from "@mantine/core";
import { LayoutComp } from "~/components/layout";
import { SignupCard } from "~/components/signup-modal";

export default function Signup() {
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
          <SignupCard />
        </RemoveScroll>
      </Modal>
      <LayoutComp>.</LayoutComp>
    </>
  );
}
