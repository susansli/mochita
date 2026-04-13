import axios from "axios";
import { SERVER_URL } from "./Environments";
import { STARTING_HAPPINESS } from "@/util/constants";
import * as SecureStore from "expo-secure-store";

async function createNewUser() {
  try {
    const response = await axios.post(
      `${SERVER_URL}/user/create`,
      {
        day: 0,
        happiness: STARTING_HAPPINESS,
        sprouts: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      return null;
    }
  
    return response?.data?.data;

  } catch (e){
    console.error("Error: ", e);
    return null;
  }
}

async function updateUserSprouts(sprouts: number) {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }
    const response = await axios.post(
      `${SERVER_URL}/user/updateSprouts`,
      {
        userId: userId,
        sprouts: sprouts,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to update sprouts");
      return null;
    }
    return response?.data?.data;

  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

async function getUser() {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/user/get`,
      {
        id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to fetch user");
      return null;
    }
    return response?.data?.data;

  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}


const UserApi = {
  createNewUser,
  updateUserSprouts,
  getUser
}

export default UserApi;