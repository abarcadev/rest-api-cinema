import { 
    Request, 
    Response, 
    Router 
} from "express";
import { MovieController } from "../controllers/movie.controller";
import { MovieService } from "../services/typeorm";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { movieSchema } from "../schemas/data-validator-joi/movie.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createMovieRoutes = () => {
    const router = Router();

    const controller = new MovieController(
        new MovieService(),
    );

    router.get(
        `/`,
        validationMiddleware(movieSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.get(
        `/:id`,
        validationMiddleware(movieSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getById(req, res)
    );

    router.post(
        `/`,
        validationMiddleware(movieSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    router.patch(
        `/:id`,
        validationMiddleware(movieSchema.getById, ReqPropertyEnum.Params),
        validationMiddleware(movieSchema.update, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.update(req, res)
    );

    router.delete(
        `/:id`,
        validationMiddleware(movieSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.delete(req, res)
    );

    return router;
};