import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import "./MainLayout.css";

export default function MainLayout({ children }: { children: React.ReactNode }){
    return (
        <div className="main-layout">
             <Header />
             <Navbar />
             <div className="content">
                {children}
             </div>
        </div>
    );
}