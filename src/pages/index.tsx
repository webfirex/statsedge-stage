import { Divider, Space, Stack, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LandingCOACard } from "~/components/landing-page/call-of-action-card";
import { LandingFAQComp } from "~/components/landing-page/faq";
import { LandingFeaturesComp } from "~/components/landing-page/features";
import { GameListComp } from "~/components/landing-page/games-list";
import { LandingHeroComp } from "~/components/landing-page/hero";
import { LayoutComp } from "~/components/layout";
import { SigninModal } from "~/components/signin-modal";
import { SignupModal } from "~/components/signup-modal";

export default function Home() {
  const BiggerThan431 = useMediaQuery("(min-width: 431px)");

  return (
    <>
      <SigninModal />
      <SignupModal />

      <LayoutComp>
        <Stack gap={0}>
          <LandingHeroComp />

          <Space h="xl" />

          <GameListComp />

          <Space h="xl" />

          <Divider size="sm" mx={BiggerThan431 ? "xl" : 0} />

          <Space h={rem(90)} />

          <LandingFeaturesComp />

          <Space h={rem(90)} />

          <LandingCOACard />

          <Space h={rem(90)} />

          <LandingFAQComp />
        </Stack>
      </LayoutComp>
    </>
  );
}
