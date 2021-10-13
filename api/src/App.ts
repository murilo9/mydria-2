import express from 'express';
import cors from 'cors';
import accountRoutes from './modules/account/routes';

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
  }

  public listen(port: number | string) {
    this.app.listen(port);
    console.log(`Server running on port ${port}`);
  }
}
