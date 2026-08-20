export function applyTheme(theme) {
  const root = document.documentElement;

  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty("--secondary-color", theme.secondaryColor);
  root.style.setProperty("--background-color", theme.backgroundColor);
  root.style.setProperty("--font-color", theme.fontColor);
}
