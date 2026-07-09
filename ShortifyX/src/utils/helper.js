import AppRouter, { SubDomainRouter } from "../AppRouter";

export const getApps = () => {
    const path = window.location.pathname;

    // Main application routes
    const mainRoutes = [
        "/",
        "/about",
        "/login",
        "/register",
        "/dashboard",
        "/error",
    ];

    // If it's one of the known pages, render the main app
    if (mainRoutes.includes(path)) {
        return AppRouter;
    }

    // Otherwise treat it as a shortened URL
    return SubDomainRouter;
};