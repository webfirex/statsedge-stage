import { AppShell } from "@mantine/core";
import { CommonHeader } from "../header/common";
import { CommonFooter } from "../footer/common";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";

interface LayoutProps {
  children: React.ReactNode;
}

export function LayoutComp(props: LayoutProps) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <>
      <AppShell
        header={{
          height: BigThenMd ? 98 : 70,
        }}
        footer={{ height: 120 }}
      >
        <CommonHeader />

        <AppShell.Main
          style={{
            backgroundImage: "url(/noise.png)",
            pointerEvents: "none",
            backgroundRepeat: "repeat",
          }}
        >
          {props.children}
        </AppShell.Main>
      </AppShell>
      <CommonFooter />
    </>
  );
}
