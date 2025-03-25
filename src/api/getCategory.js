import {get} from '../utils/requests';

export const fetchCategories = async () => {
  try {
    const response = await get("category");
    
    if (!response || response.success) {
      throw new Error(response?.message || "Failed to fetch categories");
    }

    return response.data.map((category) => ({
      ...category,
      name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Ném lỗi để xử lý ở custom hook
  }
};
