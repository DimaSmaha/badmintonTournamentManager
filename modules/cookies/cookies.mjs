export const getCookie = (cookieName) =>
  Cookies.get(`${cookieName}`) != undefined
    ? JSON.parse(Cookies.get(`${cookieName}`))
    : undefined;

export const setCookie = (cookieName, cookieValue) =>
  Cookies.set(`${cookieName}`, JSON.stringify(cookieValue), {
    expires: 365,
  });
