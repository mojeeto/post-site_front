import { isAxiosError } from "axios";
import axios from "../util/axios";

export const registerNewUser = async (data: FormData | object) => {
  try {
    const response = await axios.put("/signup", data);
    return response;
  } catch (err) {
    if (isAxiosError(err)) return err.response;
    throw new Error("Error while signup");
  }
};

export const loginUser = async (data: FormData | object) => {
  try {
    const response = await axios.post("/login", data);
    return response;
  } catch (err) {
    if (isAxiosError(err)) return err.response;
    throw new Error("Error while login");
  }
};
