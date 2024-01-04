import dynamic from "next/dynamic";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "~/styles/globals.css";

import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { createTheme, rem } from "@mantine/core";
import { type NextComponentType, type NextPageContext } from "next";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useShallowEffect } from "@mantine/hooks";

const SessionProvider = dynamic(
  () => import("next-auth/react").then((mod) => mod.SessionProvider),
  {
    ssr: false,
  }
);

const MantineProvider = dynamic(
  () => import("@mantine/core").then((mod) => mod.MantineProvider),
  {
    ssr: false,
  }
);

const Notifications = dynamic(
  () => import("@mantine/notifications").then((mod) => mod.Notifications),
  {
    ssr: false,
  }
);

const ModalsProvider = dynamic(
  () => import("@mantine/modals").then((mod) => mod.ModalsProvider),
  {
    ssr: false,
  }
);

const Head = dynamic(() => import("next/head"), {
  ssr: false,
});

const theme = createTheme({
  fontFamily: "blenderMed",

  headings: {
    fontFamily: "blenderHea",
    sizes: {
      h1: {
        fontSize: rem(60),
        lineHeight: rem(50),
      },
      h2: {
        fontSize: rem(50),
        lineHeight: rem(40),
      },
      h3: {
        fontSize: rem(40),
        lineHeight: rem(30),
      },
      h4: {
        fontSize: rem(30),
        lineHeight: rem(20),
      },
      h5: {
        fontSize: rem(20),
        lineHeight: rem(10),
      },
      h6: {
        fontSize: rem(10),
        lineHeight: rem(5),
      },
    },
  },

  defaultRadius: "sm",

  colors: {
    dark: [
      "#eae7dd",
      "#656363",
      "#656363",
      "#373535",
      "#4A4848",
      "#1E1D1D",
      "#161515",
      "#0E0E0E",
      "#090909",
      "#060606",
    ],
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: NextComponentType<NextPageContext, unknown, unknown>;
  pageProps: {
    session: Session | null;
  };
}) => {
  const router = useRouter();

  useShallowEffect(() => {
    const msg = router.query.msg ?? router.query.error;

    if (
      msg &&
      typeof msg === "string" &&
      msg.length > 0 &&
      msg !== "CredentialsSignin"
    ) {
      void router.replace(router.pathname, undefined, {
        shallow: true,
      });

      notifications.show({
        message: msg,
      });
    }
  }, [router.isReady, router.query.msg]);

  return (
    <>
      <Head>
        <title>Stats Edge</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <link rel="icon" href="/favicon.png" />
      </Head>

      <SessionProvider session={session}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <ModalsProvider>
            <Notifications zIndex={15000} />

            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
