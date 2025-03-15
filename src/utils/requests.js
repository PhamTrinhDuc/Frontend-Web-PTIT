const API_DOMAIN = "https://dummyjson.com";

const request = async (url, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_DOMAIN}/${url}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${method} request failed:`, error);
    return null;
  }
};

export const get = (url) => request(url, 'GET');
export const post = (url, body) => request(url, 'POST', body);
export const put = (url, body) => request(url, 'PUT', body);
export const remove = (url) => request(url, 'DELETE');