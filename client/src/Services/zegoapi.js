import axios from "axios";

export default async function getZegoToken() {
  const res = await axios.get("/api/zego/token", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return res.data.token;
}