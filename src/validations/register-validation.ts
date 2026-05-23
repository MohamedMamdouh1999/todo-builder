import * as yup from "yup";

const registerSchema = yup.object({
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters"),
  email: yup.string().email().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and no spaces"),
}).required();

export default registerSchema;