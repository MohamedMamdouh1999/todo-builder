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
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <ProtectedRoot redirectPath="/login">
                    <Home />
                </ProtectedRoot>
            },
            {
                path: "/profile",
                element: <ProtectedRoot redirectPath="/login">
                    <Profile />
                </ProtectedRoot>
            },
            {
                path: "/login",
                element: <ProtectedRoot reverse redirectPath="/">
                    <Login />
                </ProtectedRoot>
            },
            {
                path: "/register",
                element: <ProtectedRoot reverse redirectPath="/">
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