import { Application } from 'express';

export default function accountRoutes(app: Application) {
  app.get('/test', (req, res) => { res.status(200).send({ data: 'works!!!' }); });

  app.post('/foo', (req, res) => { res.status(200).send({ data: 'bar' }); });
}
