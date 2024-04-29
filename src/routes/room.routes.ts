import { 
    Request, 
    Response, 
    Router 
} from "express";
import { RoomController } from "../controllers/room.controller";
import { RoomService } from "../services/typeorm";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { roomSchema } from "../schemas/data-validator-joi/room.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createRoomRoutes = () => {
    const router = Router();

    const controller = new RoomController(
        new RoomService(),
    );

    router.get(
        '/',
        validationMiddleware(roomSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.get(
        '/:id',
        validationMiddleware(roomSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getById(req, res)
    );

    router.post(
        '/',
        validationMiddleware(roomSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    router.patch(
        '/:id',
        validationMiddleware(roomSchema.getById, ReqPropertyEnum.Params),
        validationMiddleware(roomSchema.update, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.update(req, res)
    );

    router.delete(
        '/:id',
        validationMiddleware(roomSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.delete(req, res)
    );

    return router;
};