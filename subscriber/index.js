const kafka = require("kafka-node");
const client = new kafka.KafkaClient({
  // kafkaHost: "localhost:29092,localhost:39092,localhost:49092",
  kafkaHost: "kafka-1:9092,kafka-2:9092,kafka-3:9092",
});

const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "*",
  },
});

const Consumer = kafka.Consumer;


io.on("connection", (socket) => {
  let consumer;
  socket.on("__join__", (selectedTopics, publisherId) => {
    console.log("Joining")
    if(consumer){
      consumer.close();
      console.log("Closing")
    }
    consumer = new Consumer(client, selectedTopics, {
      autoCommit: false,
    });
    consumer.on("message", (message) => {
      console.log(message);
      io.emit(publisherId, message, publisherId );
    });
  });
  socket.on('disconnect',()=>{
    console.log("Disconnecting")
    consumer.pause();
    consumer = null;
  })
});

// const consumer = new Consumer(
//   client,
//   [
//     {
//       topic: "Artificial_Intelligence",
//       partition: 1,
//     },
//   ],
//   {
//     autoCommit: false,
//   }
// );

// consumer.on("message", (message) => {
//   console.log(message);
// });

// consumer.on("error", (err) => {
//   console.log(err);
// });

io.listen(3000);
