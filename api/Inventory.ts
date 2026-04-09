import axios from "axios";
import { SERVER_URL } from "./Environments";
import * as SecureStore from "expo-secure-store";

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

async function buyItem(itemId: string) {
  try {

    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/inventory/buyItem`,
      {
        itemId: itemId,
        userId: userId,
        qty: 1
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to buy item");
      return null;
    }
    console.log("Buy item response: ", response.data);
    return response?.data?.data;

  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

const InventoryApi = {
  getAllStoreItems,
  buyItem
};

export default InventoryApi;
