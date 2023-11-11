import axios from "axios";

// Create a function to get the configured axios instance
const getApiClient = (token) => {
  return axios.create({
    baseURL: "http://localhost:9000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchData = async (route, token) => {
  const apiClient = getApiClient(token);
  try {
    const response = await apiClient.get(route);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("API request failed");
  }
};

export const fetchDataOne = async (route, id, token) => {
  const apiClient = getApiClient(token);
  try {
    const response = await apiClient.get(`${route}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("API request failed");
  }
};

export const addData = async (route, data, token) => {
  const apiClient = getApiClient(token);
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
export const updateData = async (route, id, data, token) => {
  const apiClient = getApiClient(token);
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
export const deleteData = async (route, id, token) => {
  const apiClient = getApiClient(token);
  try {
    const response = await apiClient.delete(`${route}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error(`Failed to delete data with ID ${id}`);
  }
};
