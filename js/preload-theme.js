// create or read the theme cookie
let isCookieThemeLight = setCookies();

changeColorsByTheme();
changeBtnTheme();

// dark or light mode

function setCookies() {
  const isCookieThemeLight = setThemeCookie();

  function setThemeCookie() {
    const theme = document.cookie.match(/(?<=theme=)[^;]*/);

    if (!theme) {
      document.cookie =
        'theme=light; samesite=lax; expires=Tue, 19 Jan 2038 03:14:07 GMT';
      return true;
    }

    if (theme[0] === 'light') return true;
    return false;
  }

  return isCookieThemeLight;
}


function changeColorsByTheme() {
  const html = document.documentElement;

  if (isCookieThemeLight) {
    html.classList.remove('dark');
    return;
  }

  html.classList.add('dark');
}

function changeBtnTheme() {
  document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') return;

    changeImgTheme();
    changeTextTheme();
  });

  function changeImgTheme() {
    if (isCookieThemeLight) {
      document.getElementById('img-theme').src = '../img/icon-sun.svg';
      return;
    }

    document.getElementById('img-theme').src = '../img/icon-moon.svg';
  }

  function changeTextTheme() {
    if (isCookieThemeLight) {
      document.getElementById('theme-text').innerHTML = 'light';
      return;
    }

    document.getElementById('theme-text').innerHTML = 'dark';
  }
}
