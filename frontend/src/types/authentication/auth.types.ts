import {z} from "zod";

export const SignUpSchema = z.object({
    email: z.coerce.string({
        required_error: "Email address is required",
    }).email({ message: "Please enter a valid email address"}),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string({ message: 'Username is required'}),
    contact: z.coerce.string().refine((val) => {
        const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/
        return phoneNumberRegex.test(val);
    }, {
        message: "Invalid phone number",
    }),
    password: z
        .string({
            required_error: "Password is required"
        })
        .min(8, { message: "Password is too short, must be at least 8 length "})
        .max(20, { message: "Password is too long"}),
    confirmPassword: z.string(),
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ['confirmPassword']
    })

export const LoginSchema = z.object({
    email: z.coerce.string({
        required_error: "Email address is required to login ",
    }).email({ message: "Please enter a valid email address"}),
    password: z
        .string({
            required_error: "Password is required to login"
        })
        .min(8, { message: "Password is too short, must be at least 8 length "})
        .max(20, { message: "Password is too long"}),
})

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: 'Email is required to get reset password instructions'
    })
})

export const ChangePasswordSchema = z.object({

    password: z
        .string({
            required_error: "Password is required"
        })
        .min(8, { message: "Password is too short, must be at least 8 length "})
        .max(20, { message: "Password is too long"}),
    confirmPassword: z.string(),
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ['confirmPassword']
    })

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export  type ChangePasswordType = z.infer<typeof ChangePasswordSchema>

