const API_DOMAIN = "http://localhost:8080/api";

const request = async (url, method = 'GET', body = null, token = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // Thêm token nếu có
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${API_DOMAIN}/${url}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      throw new Error(`Request failed with status ${response.status}: ${errorData.message || errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${method} request failed:`, error.message);
    throw error;
  }
};

export const get = (url, token) => request(url, 'GET', null, token);
export const post = (url, body, token) => request(url, 'POST', body, token);
export const put = (url, body, token) => request(url, 'PUT', body, token);
export const remove = (url, token) => request(url, 'DELETE', null, token);