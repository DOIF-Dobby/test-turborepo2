export function ThemeScript() {
  const code = `(function() {
    try {
      var localTheme = localStorage.getItem('app-theme');
      var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme;

      if (!localTheme || localTheme === 'system') {
        theme = supportDarkMode ? 'switchui-dark' : 'switchui-light';
      } else {
        theme = localTheme === 'dark' ? 'switchui-dark' : 'switchui-light';
      }
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })()`

  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  )
}
