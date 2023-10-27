// apiUtils.js

import axios from "axios";
let auth = localStorage.getItem("userToken");

const apiClient = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    Authorization: `Bearer ${auth}`,
  },
});

export const fetchData = async (route) => {
  try {
    const response = await apiClient.get(route);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("API request failed");
  }
};
export const fetchDataOne = async (route, id) => {
  try {
    const response = await apiClient.get(`${route}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("API request failed");
  }
};
export const addData = async (route, data) => {
  try {
    const response = await apiClient.post(route, data);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(`Failed to add ${data}`);
  }
};

// Update data
export const updateData = async (route, id, data) => {
  try {
    const response = await apiClient.put(`${route}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(`Failed to update ${data}`);
  }
};

// Delete data
export const deleteData = async (route, id) => {
  try {
    const response = await apiClient.delete(`${route}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(`Failed to delete data with ID ${id}`);
  }
};
