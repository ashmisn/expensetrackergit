import axios from "axios";
import { BASE_URL } from "../../utils/url";

// Add category
export const addCategoryAPI = async ({ name, type }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/categories/create`,
      { name, type }
    );
    return response.data;
  } catch (error) {
    console.error("Error while adding category:", error);
    throw error;
  }
};

// Update category
export const updateCategoryAPI = async ({ name, type, id }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/categories/update/${id}`,
      { name, type }
    );
    return response.data;
  } catch (error) {
    console.error("Error while updating category:", error);
    throw error;
  }
};

// Delete category
export const deleteCategoryAPI = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error while deleting category:", error);
    throw error;
  }
};

// List categories
export const listCategoriesAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/lists`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};
