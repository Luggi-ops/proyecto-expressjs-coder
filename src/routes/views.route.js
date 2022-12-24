import { Router } from 'express';

const viewsRouter = new Router();

viewsRouter.get("/", (req, res, next) => {
    res.render("home")
})

viewsRouter.get("/realTimeProducts", (req, res, next) => {
    res.render("realTimeProducts")
})

export default viewsRouter;
