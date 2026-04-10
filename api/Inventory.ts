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

async function getInventoryItems() {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/inventory/getUserInventory`,
      {
        userId: userId
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to fetch inventory items");
      return null;
    }
    return response?.data?.data;

  } catch (e) {
    console.error("Error: ", e);
    return null;

  }
}

async function equipBagItem(itemId: string) {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/inventory/equipItem`,
      {
        itemId: itemId,
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to equip item");
      return null;
    }

    return response?.data?.data;

  } catch (e) {
    console.error("Error: ", e);
    return null;
  }

}

async function getUserEquippedItems() {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/inventory/getUserEquippedItems`,
      {
        userId: userId
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to fetch equipped items");
      return null;
    }

    console.log("Equipped items response: ", response.data.data);

    return response?.data?.data;

  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

const InventoryApi = {
  getAllStoreItems,
  buyItem,
  getInventoryItems,
  equipBagItem,
  getUserEquippedItems
};

export default InventoryApi;
