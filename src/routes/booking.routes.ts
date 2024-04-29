import { 
    Request,
    Response,
    Router 
} from "express";
import { BookingController } from "../controllers/booking.controller";
import { 
    BillboardService, 
    BookingService, 
    CustomerService, 
    SeatService 
} from "../services/typeorm";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { bookingSchema } from "../schemas/data-validator-joi/booking.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createBookingRoutes = () => {
    const router = Router();

    const controller = new BookingController(
        new BookingService(),
        new CustomerService(),
        new SeatService(),
        new BillboardService(),
    );

    router.get(
        '/',
        validationMiddleware(bookingSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.get(
        '/get-all-by-date-range',
        validationMiddleware(bookingSchema.getAllByDateRange, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAllByDateRange(req, res)
    );

    router.get(
        '/:id',
        validationMiddleware(bookingSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getById(req, res)
    );

    router.post(
        '/',
        validationMiddleware(bookingSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    router.patch(
        '/:id',
        validationMiddleware(bookingSchema.getById, ReqPropertyEnum.Params),
        validationMiddleware(bookingSchema.update, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.update(req, res)
    );

    router.delete(
        '/:id',
        validationMiddleware(bookingSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.delete(req, res)
    );    

    return router;
};