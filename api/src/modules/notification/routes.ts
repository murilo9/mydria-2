import { Application } from 'express';
import makeRoute from '../system/helpers/makeRoute'
import verifyJWT from '../system/helpers/verifyJWT'
import userOwnsNotification from './authorizators/userOwnsNotification'
import RemoveNotificationController from './controllers/RemoveNotification';
import SeeNotificationController from './controllers/SeeNotification'

export default function notificationRoutes(app: Application) {
  app.post('/notification/:notificationId', verifyJWT, makeRoute(new SeeNotificationController(userOwnsNotification)));
  app.delete('/notification/:notificationId', verifyJWT, makeRoute(new RemoveNotificationController(userOwnsNotification)));
}
