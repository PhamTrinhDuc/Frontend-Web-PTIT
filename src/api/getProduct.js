import {get} from '../utils/requests';

export const fetchProduct = async () => {
  try {
    const response = await get("product");
    
    if (!response || response.success) {
      throw new Error(response?.message || "Failed to fetch product");
    }

    return response.data.map((product) => ({
      ...product,
      name: product.name.charAt(0).toUpperCase() + product.name.slice(1),
    }));
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Ném lỗi để xử lý ở custom hook
  }
};
