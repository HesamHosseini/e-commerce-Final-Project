import React from "react";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
