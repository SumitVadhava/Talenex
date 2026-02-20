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
      include: ["Profile", "Skills", "Reputation", "Reviews"],
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return mapUsersApiToSkillsList(response.data);
};
