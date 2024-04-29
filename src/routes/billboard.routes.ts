import { 
    Request, 
    Response, 
    Router 
} from "express";
import { BillboardController } from "../controllers/billboard.controller";
import { 
    BillboardService, 
    MovieService, 
    RoomService 
} from "../services/typeorm";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { billboardSchema } from "../schemas/data-validator-joi/billboard.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createBillboardRoutes = () => {
    const router = Router();

    const controller = new BillboardController(
        new BillboardService(),
        new MovieService(),
        new RoomService(),
    );

    router.get(
        '/',
        validationMiddleware(billboardSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.get(
        '/:id',
        validationMiddleware(billboardSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getById(req, res)
    );

    router.post(
        '/',
        validationMiddleware(billboardSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    router.patch(
        '/:id',
        validationMiddleware(billboardSchema.getById, ReqPropertyEnum.Params),
        validationMiddleware(billboardSchema.update, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.update(req, res)
    );

    router.delete(
        '/:id',
        validationMiddleware(billboardSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.delete(req, res)
    );

    return router;
};