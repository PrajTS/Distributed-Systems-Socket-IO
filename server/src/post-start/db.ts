import logger from '@shared/Logger';
import mongoose from 'mongoose';

export default () => {
    mongoose.connect((process.env as any).DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    mongoose.connection
        .once('open', () => logger.info("Connected to DB"))
        .on('error', (error) => logger.err("unable to connect to database: " + error));
};