const kafka = require("kafka-node");
const express = require("express");
const { searchNewsController } = require("./controller");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://mongo:27017")
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(e);
    console.log(`not connected`);
  });

const newsSchema = {
  title: String,
  description: String,
  content: String,
  url: String,
  image: String,
  publishedAt: Date,
  source: {
    name: String,
    url: String,
  },
  channel: String,
  publisherId: String,
};

const News = mongoose.model("News", newsSchema);

const app = express();
const port = 3000;

const client = new kafka.KafkaClient({
  kafkaHost: "kafka-1:9092,kafka-2:9092,kafka-3:9092",
  // kafkaHost: "localhost:29092,localhost:39092,localhost:49092",
});
const Producer = kafka.Producer;
const producer = new Producer(client);
const topicsToCreate = [
  {
    topic: "Artificial_Intelligence",
    partitions: 3,
    replicationFactor: 1,
  },
  {
    topic: "Machine_Learning",
    partitions: 3,
    replicationFactor: 1,
  },
  {
    topic: "Deep_Learning",
    partitions: 3,
    replicationFactor: 1,
  },
];

client.createTopics(topicsToCreate, (error, result) => {
  console.log("Create topics", result);
  if(error){
    console.log("Create topics Error", error)
  }
});

app.use(express.json());

app.get("/api/search", searchNewsController);
app.post("/api/publish", publishNewsController);

function publishNewsController(request, response) {
  const { channel, news, publisherId, partition = 0 } = request.body;

  const _news = { ...news, channel, publisherId };

  const record = new News(_news);
  record.save().then((res) => console.log(res));
  producer.send(
    [{ topic: channel, messages: JSON.stringify(_news), partition }],
    (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    }
  );
  response.status(200).send();
}

producer.on("error", (err) => {
  console.log(err);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
