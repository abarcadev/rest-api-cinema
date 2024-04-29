import { 
    Request,
    Response,
    Router 
} from "express"
import { SeatController } from "../controllers/seat.controller";
import { RoomService, SeatService } from "../services/typeorm";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { seatSchema } from "../schemas/data-validator-joi/seat.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createSeatRoutes = () => {
    const router = Router();

    const controller = new SeatController(
        new SeatService(),
        new RoomService(),
    );

    router.get(
        '/',
        validationMiddleware(seatSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.get(
        '/get-all-by-billboard-date/:date',
        validationMiddleware(seatSchema.getAllByBillboardDate, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getAllByBillboardDate(req, res)
    );

    router.get(
        '/:id',
        validationMiddleware(seatSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getById(req, res)
    );

    router.post(
        '/',
        validationMiddleware(seatSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    router.patch(
        '/:id',
        validationMiddleware(seatSchema.getById, ReqPropertyEnum.Params),
        validationMiddleware(seatSchema.update, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.update(req, res)
    );

    router.delete(
        '/:id',
        validationMiddleware(seatSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.delete(req, res)
    );
    
    return router;
};