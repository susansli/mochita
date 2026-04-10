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
        qty: 1,
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
        userId: userId,
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
        userId: userId,
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

    return response?.data?.data;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

async function consumeTreat(itemId: string, qty: number) {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/inventory/useTreat`,
      {
        userId: userId,
        itemId: itemId,
        qty: qty,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to use treat");
      return null;
    }

    return response?.data?.data;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

async function unequipBagItem(itemId: string) {
  try {
    const userId = await SecureStore.getItemAsync("userId");

    const response = await axios.post(
      `${SERVER_URL}/inventory/unequipItem`,
      {
        userId: userId,
        itemId: itemId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to unequip item");
      return null;
    }

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
  getUserEquippedItems,
  consumeTreat,
  unequipBagItem
};

export default InventoryApi;
