const axios = require("axios");

const searchNews = async (q) => {
  const api_key = "2f8eb762bc9e93836245d6dc1bd05b0c";
  const result = await axios.get("https://gnews.io/api/v4/search", {
    params: {
      q,
      token: api_key,
      lang: "en",
    },
  });
  return result.data;
};

module.exports = { searchNews };
