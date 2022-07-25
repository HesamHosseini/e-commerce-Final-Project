import React from "react";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

function Main({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Main;
