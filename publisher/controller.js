const { searchNews } = require("./service");

const searchNewsController = async (request, response) => {
  const { q } = request.query;
  try {
    res = await searchNews(q);
    response.json(res).end();
  } catch (e) {
    console.log(e)
    response.status(500).send();
  }
};

module.exports = { searchNewsController };
