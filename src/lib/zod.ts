import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Password confirmation does not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export const SignUpVerficationSchema = z.object({
  code: z.string().length(6),
});

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const UserGeneralFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

export const UserPasswordFormSchema = z
  .object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password confirmation does not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
export type SignUpVerficationType = z.infer<typeof SignUpVerficationSchema>;
export type SignInFormType = z.infer<typeof SignInFormSchema>;
export type UserGeneralFormType = z.infer<typeof UserGeneralFormSchema>;
export type UserPasswordFormType = z.infer<typeof UserPasswordFormSchema>;
