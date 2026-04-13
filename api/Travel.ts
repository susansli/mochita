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

async function updateTrip() {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/travel/updateTrip`,
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
      console.error("Failed to update trip");
      return null;
    }
    return response?.data?.data;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

async function getActiveTripData() {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/travel/getActiveTripData`,
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
      console.error("Failed to get active trip data");
      return null;
    }
    return response?.data?.data;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

async function getPostcardData(tripId: string) {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }

    const response = await axios.post(
      `${SERVER_URL}/travel/getPostcard`,
      {
        userId: userId,
        tripId: tripId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to get postcard data");
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
  updateTrip,
  getActiveTripData,
  getPostcardData
};

export default TravelApi;
