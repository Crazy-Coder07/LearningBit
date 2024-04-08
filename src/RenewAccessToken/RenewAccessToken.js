import { getDataRenew } from "../config/config"

export const renewAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      "x-refresh-token": refreshToken,
    };

    const response = await getDataRenew("user/renewal-access-token", headers);

    if (response?.data?.success) {
      return response?.data?.data.newAccessToken;
    } else {
      console.error("Failed to renew access token");
      localStorage.clear();
      window.location.reload();
      console.error("Failed to renew access token");
      return false;
    }
  } catch (e) {
    console.log(e);
    localStorage.clear();
    window.location.reload();
    return false;
  }
};
