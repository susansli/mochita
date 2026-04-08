import axios from "axios";
import { SERVER_URL } from "./Environments";

async function getAllStoreItems() {
  try {
    const response = await axios.get(
      `${SERVER_URL}/inventory/getAllStoreItems`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to fetch store items");
      return [];
    }

    return response?.data?.data;
  } catch (e) {
    console.error("Error: ", e);
    return [];
  }
}

const InventoryApi = {
  getAllStoreItems,
};

export default InventoryApi;
