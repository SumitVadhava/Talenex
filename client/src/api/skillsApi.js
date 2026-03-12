import qs from "qs";
import api from "./axios"; // your axios instance
import { mapUsersApiToSkillsList } from "../utils/mapUsers";

export const fetchSkills = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await api.get("/User/All", {
    params: {
      include: ["Profile", "Skills", "Reputation", "Reviews", "Privacy", "Availability", "Notifications"],
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return mapUsersApiToSkillsList(response.data);
};

export const fetchFavorites = async () => {
  const response = await api.get(
    "/User/Details",
    {
      params: {
        include: [
          "favourites"
        ],
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    },
  );
  // Extract the favourites mapping. Based on logs, it contains a favIds array.
  const favs = response.data?.favourites || {};

  // Robustly return an array. If favIds is missing, safely return [].
  const favoriteIds = Array.isArray(favs.favIds) ? favs.favIds : [];

  return favoriteIds;
};

export const toggleFavorite = async ({ userId, value }) => {
  console.log("userId : ", userId);
  console.log("value : ", value);


  const response = await api.patch(`/user-fav/upsert`, {
    "favId": userId,
    "isAdd": value
  });

  console.log(response.data);

  return response.data;
};

/**
 * AI Match – calls the LOCAL backend (localhost:5296) which uses Groq to rank users.
 * Using a direct URL so this can be tested locally without deploying to the live server.
 * @param {{ requiredSkills: string[], topN: number }} params
 * @returns {Promise<string[]>} matchedIds – ordered best-to-least Talenex user IDs
 */
export const fetchAIMatches = async ({ requiredSkills, topN = 5 }) => {
  const response = await api.post("/User/AiMatch",
    { requiredSkills, topN }
  );
  return response.data?.matchedIds ?? [];
};