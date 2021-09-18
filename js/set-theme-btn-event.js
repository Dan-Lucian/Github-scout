export function setThemeBtnEvent() {
  document.getElementById('btn-theme').onpointerdown = changeTheme;
}

function changeTheme() {
  const isCookieThemeLight = changeCookieTheme();

  changeColorsByTheme();
  changeBtnTheme();

  function changeCookieTheme() {
    const isCookieThemeLight =
      document.cookie.match(/(?<=theme=)[^;]*/)[0] === 'light';

    if (isCookieThemeLight) {
      document.cookie =
        'theme=dark; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
      return false;
    }

    document.cookie =
      'theme=light; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
    return true;
  }

  function changeColorsByTheme() {
    const html = document.documentElement;

    if (isCookieThemeLight) {
      html.classList.add('transition');
      setTimeout(() => html.classList.remove('transition'), 300);
      html.classList.remove('dark');
      return;
    }

    html.classList.add('transition');
    setTimeout(() => html.classList.remove('transition'), 300);
    html.classList.add('dark');
  }

  function changeBtnTheme() {
    changeImgTheme();
    changeTextTheme();

    function changeImgTheme() {
      if (isCookieThemeLight) {
        document.getElementById('img-theme').src =
          '/Github-scout/img/icon-sun.svg';
        return;
      }

      document.getElementById('img-theme').src =
        '/Github-scout/img/icon-moon.svg';
    }

    function changeTextTheme() {
      if (isCookieThemeLight) {
        document.getElementById('theme-text').innerHTML = 'light';
        return;
      }

      document.getElementById('theme-text').innerHTML = 'dark';
    }
  }
}
