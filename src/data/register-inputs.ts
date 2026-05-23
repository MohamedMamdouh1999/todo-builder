import type { IFormField } from "../interfaces/form-field";
import type { IRegisterForm } from "../interfaces/register-form";

export const registerInputs: IFormField<IRegisterForm>[] = [
    {
        name: "username",
        type: "text",
        placeholder: "Username"
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email"
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password"
    }
]