export function ThemeScript() {
  const code = `(function() {
    try {
      var localTheme = localStorage.getItem('app-theme');
      var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      var theme;

      // 1. 시스템 모드이거나 저장된 값이 없을 때
      if (!localTheme || localTheme === 'system') {
        theme = supportDarkMode ? 'switchui-dark' : 'switchui-light';
      } 
      // 2. 명시적으로 Light/Dark가 저장되어 있을 때
      else {
        theme = localTheme === 'dark' ? 'switchui-dark' : 'switchui-light';
      }

      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })()`

  return <script id="theme-script" dangerouslySetInnerHTML={{ __html: code }} />
}
