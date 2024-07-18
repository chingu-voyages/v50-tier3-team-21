import {infer , z} from "zod";

export const SignUpSchema = z.object({
    email: z.coerce.string({
        required_error: "Email address is required",
    }).email({ message: "Please enter a valid email address"}),
    firstname: z.string(),
    lastname: z.string(),
    contact: z.coerce.string().refine((val) => {
        const phoneNumberRegex = /^[0-9]{10}$/;
        return phoneNumberRegex.test(val);
    }, {
        message: "Invalid phone number. It must be 10 digits long."
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

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;

