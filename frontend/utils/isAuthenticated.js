import axios from 'axios';

export const isUserAuthenticated = async (access_token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/token/verify/`,
      {
        token: access_token,
      }
    );

    if (response.status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
};
