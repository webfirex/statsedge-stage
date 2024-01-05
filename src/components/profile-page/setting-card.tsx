/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Loader,
  PasswordInput,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconKey, IconTicket, IconUserCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  UserGeneralFormSchema,
  type UserPasswordFormType,
  type UserGeneralFormType,
  UserPasswordFormSchema,
} from "~/lib/zod";

export function ProfileSettingCard() {
  const { isSignedIn, isLoaded: UserIsLoaded, user } = useUser();

  const [IsLoading, setIsLoading] = useState(false);

  const GeneralForm = useForm<UserGeneralFormType>({
    initialValues: {
      firstName: "",
      lastName: "",
    },

    validate: zodResolver(UserGeneralFormSchema),
  });

  const PasswordForm = useForm<UserPasswordFormType>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: zodResolver(UserPasswordFormSchema),
  });

  useEffect(() => {
    if (user) {
      GeneralForm.setValues({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
      });
    }
  }, [user, isSignedIn, UserIsLoaded]);

  if (!UserIsLoaded) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (!isSignedIn) {
    return (
      <Center>
        <Text>You are not signed in. Please sign in to view your profile.</Text>
      </Center>
    );
  }

  const HandelGeneralUpdate = async (values: UserGeneralFormType) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await user.update({
        firstName: values.firstName,
        lastName: values.lastName,
      });

      // await user.updatePassword

      notifications.show({
        title: "Success",
        message: "Your profile has been updated successfully.",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: (error as { errors: { longMessage: string }[] })?.errors[0]
          ?.longMessage,
        color: "red",
      });

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const HandelPasswordUpdate = async (values: UserPasswordFormType) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await user.updatePassword({
        newPassword: values.newPassword,
        currentPassword: user.passwordEnabled ? values.oldPassword : undefined,
      });

      notifications.show({
        title: "Success",
        message: "Your password has been updated successfully.",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: (error as { errors: { longMessage: string }[] })?.errors[0]
          ?.longMessage,
        color: "red",
      });

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid columns={10}>
        <Grid.Col span={{ base: 10, md: 7 }}>
          <Card p="lg" pt="xl" className="partial-border-pro triang-pro">
            <Stack>
              <Stack w="fit-content" gap={4}>
                <Group gap="xs">
                  <Title order={5}>Edit Profile</Title>

                  <IconUserCircle size={18} />
                </Group>

                <Divider size="md" color="blue" />
              </Stack>

              <form
                onSubmit={GeneralForm.onSubmit((values) => {
                  void HandelGeneralUpdate(values);
                })}
              >
                <Stack>
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput
                      radius="xl"
                      placeholder="First Name"
                      label="First Name"
                      disabled={IsLoading}
                      {...GeneralForm.getInputProps("firstName")}
                    />
                    <TextInput
                      radius="xl"
                      placeholder="Last Name"
                      label="Last Name"
                      disabled={IsLoading}
                      {...GeneralForm.getInputProps("lastName")}
                    />

                    <TextInput
                      radius="xl"
                      placeholder="Email"
                      label="Email"
                      disabled={IsLoading}
                      readOnly
                      value={user.emailAddresses[0]?.emailAddress ?? ""}
                    />
                  </SimpleGrid>

                  <Group>
                    <Button size="xs" px="xl" type="submit" loading={IsLoading}>
                      <Text size="sm">Save</Text>
                    </Button>
                  </Group>
                </Stack>
              </form>

              <Space />

              <Stack w="fit-content" gap={4}>
                <Group gap="xs">
                  <Title order={5}>Change Password</Title>

                  <IconKey size={18} />
                </Group>

                <Divider size="md" color="blue" />
              </Stack>

              <form
                onSubmit={PasswordForm.onSubmit((values) => {
                  void HandelPasswordUpdate(values);
                })}
              >
                <Stack>
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <PasswordInput
                      radius="xl"
                      placeholder="Password"
                      label="Old Password"
                      disabled={IsLoading}
                      {...PasswordForm.getInputProps("oldPassword")}
                    />
                    <PasswordInput
                      radius="xl"
                      placeholder="Password"
                      label="New Password"
                      disabled={IsLoading}
                      {...PasswordForm.getInputProps("newPassword")}
                    />
                    <PasswordInput
                      radius="xl"
                      placeholder="Password"
                      label="Confirm Password"
                      disabled={IsLoading}
                      {...PasswordForm.getInputProps("confirmPassword")}
                    />
                  </SimpleGrid>

                  <Group>
                    <Button size="xs" px="xl" type="submit" loading={IsLoading}>
                      <Text size="sm">Change</Text>
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 10, md: 3 }}>
          <Card p="lg" pt="xl" className="partial-border-pro triang-pro">
            <Stack>
              <Stack w="fit-content" gap={4}>
                <Group gap="xs">
                  <Title order={5}>Manage Subscriptions</Title>

                  <IconTicket size={18} />
                </Group>

                <Divider size="md" color="blue" />
              </Stack>

              <Text size="sm">
                Manage billing information, payment methods and cancel
                subscription
              </Text>

              <Group>
                <Button size="xs">
                  <Text size="sm">Manage Subscriptions</Text>
                </Button>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
