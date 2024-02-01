import { Card } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";

export function AdBanner() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <>
      <Card
        h={BigThenMd ? "100" : "70"}
        p={"md"}
        radius={"md"}
        style={{
          backgroundImage: "url(./pro-hero.png)",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}
