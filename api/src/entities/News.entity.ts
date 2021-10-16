import mongoose from "mongoose";

export type newsDocument = mongoose.Document & {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: Date;
  source: {
    name: string;
    url: string;
  };
  channel: string;
  publisherId: string;
};

const newsSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const News = mongoose.model<newsDocument>("News", newsSchema);

export default News;
