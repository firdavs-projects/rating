import React, {FC} from "react";
import {Outlet} from "react-router-dom";

const Layout: FC = () => {

    return (
        <>
            <header className="container mx-auto py-10 px-3">
                <h1 className="text-gray-700 text-3xl font-bold">Система оценки пользователей</h1>
            </header>
            <main className="container mx-auto px-3">
                <Outlet />
            </main>
            <footer className="container mx-auto py-4 mt-3 px-3">
                Firdavs Abdulloev &copy; {new Date().getFullYear()}
            </footer>
        </>
    )
};

export default Layout;
