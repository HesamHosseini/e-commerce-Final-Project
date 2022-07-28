module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          0: "#bb5645",
          1: "#EA6C56",
          2: "#ee8978",
        },
        secondary: {
          1: "#426C89",
          2: "#6EAFDC",
        },
        myWhite: {
          1: "#F8F8F8",
          2: "#DFDFDF",
        },
        myBlack: {
          1: "#1C1818",
        },
      },
      fontFamily: {
        IRYekanBold: ["IRYekanBold", "Bold"],
        IRYekan: ["IRYekan", "Normal"],
      },
      fontSize: {
        h1: "40px",
        h2: "36px",
        h3: "32px",
        h4: "28px",
        h5: "24px",
        h6: "20px",
        p18: "18px",
        p16: "16px",
      },
      screens: {
        xsm: "240px",
      },
    },
  },
  plugins: [],
};
