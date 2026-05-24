import { createBrowserRouter } from "react-router";

import RootLayout from "../pages/RootLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import ProtectedRoot from "../auth/ProtectedRoot";

const router = createBrowserRouter([
    {
        path: "/todo-builder",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <ProtectedRoot redirectPath="/todo-builder/login">
                    <Home />
                </ProtectedRoot>
            },
            {
                path: "profile",
                element: <ProtectedRoot redirectPath="/todo-builder/login">
                    <Profile />
                </ProtectedRoot>
            },
            {
                path: "login",
                element: <ProtectedRoot reverse redirectPath="/todo-builder">
                    <Login />
                </ProtectedRoot>
            },
            {
                path: "register",
                element: <ProtectedRoot reverse redirectPath="/todo-builder">
                    <Register />
                </ProtectedRoot>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router