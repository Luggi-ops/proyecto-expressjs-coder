import { Router } from 'express';

const viewsRouter = new Router();

viewsRouter.get("/", (req, res, next) => {
    res.render("home")
})

export default viewsRouter;
