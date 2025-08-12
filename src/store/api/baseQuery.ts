import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { auth } from "../../config/firebase";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: async (headers) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        headers.set("authorization", `Bearer ${token}`);
        headers.set("content-type", "application/json");
      } catch (error) {
        console.error("Error getting Firebase token:", error);
      }
    }
    return headers;
  },
});


const baseQueryWithRetry = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const user = auth.currentUser;
    if (user) {
      try {
        await user.getIdToken(true);
        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }
  }

  return result;
};

export default baseQueryWithRetry;
