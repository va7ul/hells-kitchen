document.addEventListener('DOMContentLoaded', () => {
  const allBodyTheme = document.body;
  const themeSwitcher = document.querySelector(
    '.switcher-toggle.desktop-theme'
  );

  const mobileThemeSwitcher = document.querySelector(
    '.switcher-toggle.mobile-theme'
  );
  //   const desktopHeader = document.querySelector('.head-theme');

  const handleThemeSwitcher = () => {
    if (themeSwitcher.checked) {
      allBodyTheme.classList.add('dark-theme');
      //   desktopHeader.classList.add('dark-theme');
      localStorage.setItem('theme-point', 'dark');
    } else {
      allBodyTheme.classList.remove('dark-theme');
      localStorage.setItem('theme-point', 'light');
    }
  };

  const handleMobileThemeSwitcher = () => {
    if (mobileThemeSwitcher.checked) {
      allBodyTheme.classList.add('dark-theme');
      //   desktopHeader.classList.add('dark-theme');
      localStorage.setItem('theme-point', 'dark');
    } else {
      allBodyTheme.classList.remove('dark-theme');
      localStorage.setItem('theme-point', 'light');
    }
  };

  const handleSetTheme = () => {
    const storageTheme = localStorage.getItem('theme-point');
    if (storageTheme === 'dark') {
      themeSwitcher.checked = true;
      mobileThemeSwitcher.checked = true;
      allBodyTheme.classList.add('dark-theme');
    } else {
      themeSwitcher.checked = false;
      mobileThemeSwitcher.checked = false;
      allBodyTheme.classList.remove('dark-theme');
    }
  };

  themeSwitcher.addEventListener('change', handleThemeSwitcher);
  mobileThemeSwitcher.addEventListener('change', handleMobileThemeSwitcher);

  handleSetTheme();

  window.addEventListener('pageshow', () => {
    handleSetTheme();
  });
});

