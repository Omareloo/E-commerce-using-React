import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/navbar";
export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
