import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { SERVER_URL } from "./Environments";

async function createGoal(date: string, text: string) {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }
    const response = await axios.post(
      `${SERVER_URL}/goals/createGoal`,
      {
        userId: userId,
        date: date,
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to create goal");
      return null;
    }
    return response?.data?.data;

  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

async function getGoalsByDate(date: string) {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.error("No user ID found in secure storage");
      return null;
    }
    const response = await axios.post(
      `${SERVER_URL}/goals/getGoalsForDate`,
      {
        userId: userId,
        date: date,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      console.error("Failed to fetch goals");
      return null;
    }
    return response?.data?.data;

  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

const GoalsApi = {
    createGoal,
    getGoalsByDate
};

export default GoalsApi;
