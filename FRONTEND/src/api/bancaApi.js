// import { getEnvVariables } from "../helpers";

// const { VITE_API_URL } = getEnvVariables();

const bancaApi = {
  get: async (url) => {
    try {
      const response = await fetch(`http://localhost:3005${url}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Error getting data", error.message);
    }
  },

  post: async (url, data) => {
    try {
      const response = await fetch(`http://localhost:3005${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error posting data to ${url}: ${error.message}`);
    }
  },
  put: async (url, data) => {
    try {
      const response = await fetch(`http://localhost:3005${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      return await response.json();
    } catch (error) {
      throw new Error("Error updating data: " + error.message);
    }
  }
  ,
  delete: async (url,data) => {
    try {
      const response = await fetch(`http://localhost:3005${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Error deleting data:", error.message);
    }
  },
};

export default bancaApi;
