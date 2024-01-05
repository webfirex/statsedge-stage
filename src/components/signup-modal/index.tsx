import {
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  PasswordInput,
  PinInput,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useAtom } from "jotai";
import { AuthModalAtom } from "~/lib/jotai";
import { LogoIconSm } from "../logo/icon";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { useForm, zodResolver } from "@mantine/form";
import {
  SignUpFormSchema,
  type SignUpVerficationType,
  type SignUpFormType,
  SignUpVerficationSchema,
} from "~/lib/zod";
import { useState } from "react";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { useLogger } from "@mantine/hooks";

export function SignupCard() {
  const { isSignedIn, user, isLoaded: UserIsLoaded } = useUser();

  useLogger("SignupCard", [
    {
      isSignedIn,
      user,
      isLoaded: UserIsLoaded,
    },
  ]);

  const { signIn, isLoaded: SigninIsLoaded } = useSignIn();

  const { isLoaded, signUp, setActive } = useSignUp();

  const [PendingVerfication, setPendingVerfication] = useState(false);

  const router = useRouter();

  const SignupForm = useForm<SignUpFormType>({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    validate: zodResolver(SignUpFormSchema),
  });

  const VerficationForm = useForm<SignUpVerficationType>({
    initialValues: {
      code: "",
    },

    validate: zodResolver(SignUpVerficationSchema),
  });

  const HandelSignUp = async (data: SignUpFormType) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerfication(true);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });

      console.error(error);
    }
  };

  const HandelVerfication = async (data: SignUpVerficationType) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        void router.push("/profile");
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });

      console.error(error);
    }
  };

  if (!isLoaded || !SigninIsLoaded || !UserIsLoaded || !window) {
    return (
      <>
        <Loader />
      </>
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
      <Card shadow="xl" className="triang">
        <Stack align="center" mx="md" my="md" maw={400}>
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

          {!PendingVerfication && (
            <form
              onSubmit={SignupForm.onSubmit((values) => {
                void HandelSignUp(values);
              })}
              style={{
                width: "100%",
              }}
            >
              <Stack>
                <TextInput
                  variant="default"
                  label="Email"
                  placeholder="Enter Email Address"
                  {...SignupForm.getInputProps("email")}
                />

                <PasswordInput
                  w="100%"
                  variant="default"
                  label="Password"
                  placeholder="Enter Password"
                  {...SignupForm.getInputProps("password")}
                />

                <PasswordInput
                  w="100%"
                  variant="default"
                  label="Confirm Password"
                  placeholder="Re-Enter Password"
                  {...SignupForm.getInputProps("passwordConfirmation")}
                />

                <Group justify="end" w="100%">
                  <Text
                    size="sm"
                    fw="bold"
                    c="blue"
                    component={Link}
                    href="/signin"
                  >
                    Already have an account ?
                  </Text>
                </Group>

                <Button variant="outline" fullWidth color="dark" type="submit">
                  <Text size="sm" fw="bold" c="dimmed">
                    Sign up
                  </Text>
                </Button>

                <Divider label="OR" size="sm" />

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
              </Stack>
            </form>
          )}

          {PendingVerfication && (
            <form
              onSubmit={VerficationForm.onSubmit((values) => {
                void HandelVerfication(values);
              })}
              style={{
                width: "100%",
              }}
            >
              <Stack align="center">
                <PinInput
                  variant="default"
                  placeholder="o"
                  type="number"
                  length={6}
                  {...VerficationForm.getInputProps("code")}
                />

                <Button variant="outline" fullWidth color="dark" type="submit">
                  <Text size="sm" fw="bold" c="dimmed">
                    Verify
                  </Text>
                </Button>
              </Stack>
            </form>
          )}
        </Stack>
      </Card>
    </>
  );
}

export function SignupModal() {
  const [AuthModal, setAuthModal] = useAtom(AuthModalAtom);

  return (
    <>
      <Modal
        opened={AuthModal === "signup"}
        onClose={() => setAuthModal(null)}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.7,
          blur: 7,
        }}
      >
        <SignupCard />
      </Modal>
    </>
  );
}
