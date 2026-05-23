import type { IFormField } from "../interfaces/form-field";
import type { ILoginForm } from "../interfaces/login-form";

export const loginInputs: IFormField<ILoginForm>[] = [
    {
        name: "identifier",
        type: "email",
        placeholder: "Email"
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password"
    }
]