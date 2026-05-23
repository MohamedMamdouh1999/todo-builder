import { Navigate } from "react-router"

import type { IUser } from "../interfaces/user";

interface IProps {
    children: React.ReactNode
    redirectPath: string
    reverse?: boolean
}

const ProtectedRoot = ({ children, redirectPath, reverse }: IProps) => {
    const user: IUser = JSON.parse(localStorage.getItem("user") || "{}");
    const isAuthenticated = !!user.jwt;

    if (reverse) {
        return !isAuthenticated ? <>{children}</> : <Navigate to={redirectPath} replace />;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to={redirectPath} replace />;
}

export default ProtectedRoot
