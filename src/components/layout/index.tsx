import { AppShell } from "@mantine/core";
import { CommonHeader } from "../header/common";

interface LayoutProps {
  children: React.ReactNode;
}

export function LayoutComp(props: LayoutProps) {
  return (
    <AppShell
      header={{
        height: 98,
      }}
      footer={{ height: 120 }}
    >
      <CommonHeader />

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}
