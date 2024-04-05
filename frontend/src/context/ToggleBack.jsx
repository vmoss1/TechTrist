import { useEffect, createContext, useState } from "react";

const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "ToggleMe");
    return "ToggleMe";
  } else {
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === "ToggleMe") {
      setTheme("ToggleMe-Again");
    } else {
      setTheme("ToggleMe");
    }
  }

  useEffect(() => {
    const resetTheme = () => {
      localStorage.setItem("theme", theme);
    };

    resetTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
