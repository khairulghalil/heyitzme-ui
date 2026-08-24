export function applyTheme(theme, builder = null) {
  const root = document.documentElement;

  if (builder) {
    root.style.setProperty("--primary-builder-color", theme.primaryColor);
    root.style.setProperty("--secondary-builder-color", theme.secondaryColor);
    root.style.setProperty("--background-builder-color", theme.backgroundColor);
    root.style.setProperty("--font-builder-color", theme.fontColor);
  } else {
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    root.style.setProperty("--background-color", theme.backgroundColor);
    root.style.setProperty("--font-color", theme.fontColor);
  }
}
