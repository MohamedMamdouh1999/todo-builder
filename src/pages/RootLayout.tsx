import { Outlet } from "react-router"

import Navbar from "../components/Navbar"

const RootLayout = () => {
    return (
        <main className="container py-8 mx-auto max-w-lg flex flex-col gap-y-4">
            <Navbar />
            <Outlet />
        </main>
    )
}

export default RootLayout
