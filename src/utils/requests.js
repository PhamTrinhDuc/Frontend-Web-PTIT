const API_DOMAIN = "http://localhost:8080/api";

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

    // Kiểm tra trạng thái phản hồi
    if (!response.ok) {
      // Thử parse phản hồi lỗi nếu có
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText); // Thử parse JSON
      } catch (e) {
        // Nếu không parse được JSON, trả về lỗi dạng text
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      throw new Error(`Request failed with status ${response.status}: ${errorData.message || errorText}`);
    }

    // Parse JSON nếu phản hồi hợp lệ
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${method} request failed:`, error.message);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const get = (url) => request(url, 'GET');
export const post = (url, body) => request(url, 'POST', body);
export const put = (url, body) => request(url, 'PUT', body);
export const remove = (url) => request(url, 'DELETE');