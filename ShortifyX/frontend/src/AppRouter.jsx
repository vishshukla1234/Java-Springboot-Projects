import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ShortenUrlPage from "./components/ShortenUrlPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import Login from "./components/Login"
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";


const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Toaster position='bottom-center' />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/about' element={<AboutPage />} />

                <Route path='/register' element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
                <Route path='/login' element={<PrivateRoute publicPage={true}><Login /></PrivateRoute>} />
                
                <Route path='/dashboard' element={ <PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute> } />
                <Route path='/error' element={ <ErrorPage /> } />
                <Route path='*' element={ <ErrorPage message="We can't seem to find the page you are looking for!!"/> } />
            </Routes>
            <Footer />
        </>
    );
}

export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/:url" element={<ShortenUrlPage />}/>
        </Routes>
    )
}