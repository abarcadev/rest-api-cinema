import { 
    Request, 
    Response, 
    Router 
} from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { 
    BillboardService, 
    BookingService, 
    CustomerService, 
    SeatService 
} from "../services/typeorm";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { transactionSchema } from "../schemas/data-validator-joi/transaction.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createTransactionRoutes = () => {
    const router = Router();

    const controller = new TransactionController(
        new SeatService(),
        new BookingService(),
        new BillboardService(),
        new CustomerService(),
    );

    router.patch(
        '/update-seat-bookings',
        validationMiddleware(transactionSchema.updateSeatBookings, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.updateSeatBookings(req, res)
    );

    router.patch(
        '/update-billboard-bookings',
        validationMiddleware(transactionSchema.updateBillboardBookings, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.updateBillboardBookings(req, res)
    );

    return router;
};