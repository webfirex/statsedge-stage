import {
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { LogoIconSm } from "../logo/icon";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useForm, zodResolver } from "@mantine/form";
import { SignInFormSchema, type SignInFormType } from "~/lib/zod";
import { notifications } from "@mantine/notifications";

export function SigninCard() {
  const { isSignedIn, isLoaded: UserIsLoaded } = useUser();

  const { signIn, isLoaded: SigninIsLoaded, setActive } = useSignIn();

  const router = useRouter();

  const SigninForm = useForm<SignInFormType>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(SignInFormSchema),
  });

  const HandleSignin = async (values: SignInFormType) => {
    if (!SigninIsLoaded) return;

    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        void router.push("/profile");
      } else {
        notifications.show({
          title: "Error",
          message: "Unexpected error occured",
          color: "red",
        });

        console.error(result, "signin err");
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: (error as { errors: { longMessage: string }[] })?.errors[0]
          ?.longMessage,
        color: "red",
      });

      console.error(error);
    }
  };

  if (!SigninIsLoaded || !UserIsLoaded || !window) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (isSignedIn) {
    void router.push("/profile");

    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Card shadow="xl" className="triang partial-border">
        <Stack align="center" mx="md" my="xs" maw={400}>
          <Group>
            <LogoIconSm />

            <Text tt="uppercase" size={rem(25)}>
              stats
              <Text
                span
                c="blue"
                inherit
                style={{
                  textShadow: "0px 0px 30px var(--mantine-color-blue-9)",
                }}
              >
                edge
              </Text>
            </Text>
          </Group>

          <Title order={4}>Welcome to Stats Edge</Title>

          <Text c="dimmed" ta="center" size="sm">
            Join Millions of other e-sports fans and stay up to date with the
            latest news, results and discussions
          </Text>

          <Divider size="sm" w="100%" />

          <form
            onSubmit={SigninForm.onSubmit((values) => {
              void HandleSignin(values);
            })}
            style={{
              width: "100%",
            }}
          >
            <Stack>
              <TextInput
                w="100%"
                variant="default"
                label="Email"
                placeholder="Enter Email Address"
                {...SigninForm.getInputProps("email")}
              />

              <PasswordInput
                w="100%"
                variant="default"
                label="Password"
                placeholder="Enter Password"
                {...SigninForm.getInputProps("password")}
              />

              <Group justify="end" w="100%">
                <Text size="sm" fw="bold" c="blue" component={Link} href="#">
                  Forgot Password ?
                </Text>
              </Group>

              <Button variant="outline" fullWidth color="dark" type="submit">
                <Text size="sm" fw="bold" c="dimmed">
                  Log In
                </Text>
              </Button>
            </Stack>
          </form>

          <Divider label="OR" size="sm" w="100%" />

          <Button
            fullWidth
            leftSection={<IconBrandGoogleFilled size={20} />}
            variant="white"
            onClick={() => {
              void signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: `/sso-callback`,
                redirectUrlComplete: `/profile`,
              });
            }}
          >
            <Text size="sm" fw="bold" c="dark.9">
              Continue with Google
            </Text>
          </Button>

          <Divider label="Don't have an account ?" size="sm" w="100%" />

          <Button fullWidth color="blue" component={Link} href="/?signup=true">
            <Text size="sm" fw="bold" c="white">
              Sign up
            </Text>
          </Button>
        </Stack>
      </Card>
    </>
  );
}

export function SigninModal() {
  const router = useRouter();

  return (
    <>
      <Modal
        opened={router.query.signin !== undefined}
        onClose={() => router.replace("/")}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.7,
          blur: 7,
        }}
        size="auto"
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <SigninCard />
      </Modal>
    </>
  );
}
