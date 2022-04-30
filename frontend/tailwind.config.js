module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        darkCol: "#111827",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        darkBlue: "#0379FF",
        navCol: "#1E2837",
        lightDark: "#F7F9FF",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        darkBlue: "#0379FF",
        greyLight: "#6A7281",
        primary: "#F7F9FF",
        secondary: "var(--color-text-secondary)",
        lightDark: "#F7F9FF",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        trans: "all 0.1s linear",
      },
    },
  },
  plugins: [],
};
