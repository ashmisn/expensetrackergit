import React from "react";
import { useFormik } from "formik";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const AddCategory = ({ setCategories }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      type: 'income',
    },
    onSubmit: async (values) => {
      console.log("Form data:", values);
      try {
        const newCategory = await addCategoryAPI(values);
        console.log("Category added successfully:", newCategory);
        // Directly update the categories list
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        formik.resetForm();
      } catch (error) {
        console.error("Error adding category:", error.response ? error.response.data : error.message);
      }
    },
  });

  return (
    <div className="mt-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category Type</label>
          <select
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
