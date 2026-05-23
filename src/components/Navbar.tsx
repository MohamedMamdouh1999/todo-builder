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
            <NavLink to="/">Home</NavLink>
            <ul className="flex gap-4">
                { user.jwt ? 
                    <>
                        <li>
                            <span>{user.user.username}</span>
                        </li>
                        <li>
                            <button type="button" className="cursor-pointer" onClick={onLogout}>Logout</button>
                        </li>
                    </>
                    : <>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navbar
