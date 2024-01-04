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

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
export type SignUpVerficationType = z.infer<typeof SignUpVerficationSchema>;
export type SignInFormType = z.infer<typeof SignInFormSchema>;
