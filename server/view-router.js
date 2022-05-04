import express from 'express';
import viewService from "./service/view-service.js";

const viewRouter = express.Router();

viewRouter.get('/navigation', viewService.renderNavigationPage);
viewRouter.get('/mahawer', viewService.renderMahawerPage);
viewRouter.get('/quran', viewService.renderQuranPage);
viewRouter.get('/:index', viewService.redirectToQuranPage);
viewRouter.get('/', viewService.redirectToQuranPage)

export default viewRouter;