import axios from "axios";
import { SERVER_URL } from "./Environments";
import { STARTING_HAPPINESS } from "@/util/constants";

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
  
    return response.data.data;

  } catch (e){
    console.error("Error: ", e);
    return null;
  }
}

const User = {
  createNewUser,
}

export default User;