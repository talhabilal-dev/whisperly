import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RootLayout = ({ children }) => {
  return (
    <div>
      {" "}
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
