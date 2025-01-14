import React from 'react';
import Home from '../Pages/Home/Home';
import Navbar1 from '../Component/Navbar1';
import Navbar2 from '../Component/Navbar2';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';


const MainLayout = () => {
    return (
        <div>
            <Navbar1></Navbar1>
            <Navbar2></Navbar2>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;