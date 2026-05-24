import { NavLink } from "react-router"
import toast from "react-hot-toast";

import type { IUser } from "../interfaces/user";

const Navbar = () => {
    const user: IUser = JSON.parse(localStorage.getItem("user") || "{}");

    const onLogout = () => {
        localStorage.removeItem("user");
        toast.success("Logout successful");
        location.reload();
    }

    return (
        <nav className="p-4 flex justify-between items-center bg-blue-500 text-white rounded">
            <NavLink to="/todo-builder">Home</NavLink>
            <ul className="flex gap-4">
                { user.jwt ? 
                    <>
                        <li>
                            <NavLink to="/todo-builder/profile">Profile</NavLink>
                        </li>
                        <li>
                            <button type="button" className="cursor-pointer" onClick={onLogout}>Logout</button>
                        </li>
                    </>
                    : <>
                        <li>
                            <NavLink to="/todo-builder/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/todo-builder/register">Register</NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navbar
