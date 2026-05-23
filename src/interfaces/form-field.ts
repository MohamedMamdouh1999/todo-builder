export interface IFormField<T> {
    name: keyof T;
    type: "text" | "email" | "password";
    placeholder: string;
}
