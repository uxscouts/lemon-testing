import { Routes, Route, Outlet } from "react-router-dom";
 //import Navbar from "./components/Navbar";
// import SiteNavbar from "./components/Navbar2";
import SiteNavbar from "./components/Navbar3";
import Home from "./pages/Home";
import About from "./pages/About";
import Reservation from "./pages/Reservation";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import Testing from "./pages/Testing";


const AppRoutes = () => {
  return (
    <>
      <SiteNavbar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};


const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<AppRoutes />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="reservation" element={<Reservation />} />
                <Route path="confirmedbooking" element={<ConfirmedBooking />} />
                <Route path="testing" element={<Testing />} />
            </Route>
        </Routes>
    )
}

export default RouterConfig;
