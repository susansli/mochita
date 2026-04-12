import axios from "axios";
import { SERVER_URL } from "./Environments";
import * as SecureStore from "expo-secure-store";

async function beginTrip() {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/travel/beginTrip`,
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
      console.error("Failed to start travel");
      return null;
    }
    return response?.data?.data;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

const TravelApi = {
  beginTrip,
};

export default TravelApi;
