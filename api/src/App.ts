import express from 'express';
import cors from 'cors';
import accountRoutes from './modules/account/routes';
import postRoutes from './modules/post/routes';
import commentRoutes from './modules/comment/routes';
import reactionRoutes from './modules/reaction/routes';

export default class MydriaApp {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.loadRoutes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private loadRoutes(): void {
    accountRoutes(this.app);
    postRoutes(this.app);
    commentRoutes(this.app);
    reactionRoutes(this.app);
  }

  public listen(port: number | string) {
    this.app.listen(port);
    console.log(`Server running on port ${port}`);
  }
}
