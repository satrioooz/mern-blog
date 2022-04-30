import { ThemeProvider } from "./ThemeContent";

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  );
};
