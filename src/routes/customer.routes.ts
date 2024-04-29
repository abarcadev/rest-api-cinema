import { 
    Request, 
    Response, 
    Router 
} from "express";
import { CustomerController } from "../controllers/customer.controller";
import { CustomerService } from "../services/typeorm";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { customerSchema } from "../schemas/data-validator-joi/customer.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createCustomerRoutes = () => {
    const router = Router();

    const controller = new CustomerController(
        new CustomerService(),
    );

    router.get(
        '/',
        validationMiddleware(customerSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.get(
        '/:id',
        validationMiddleware(customerSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getById(req, res)
    );

    router.post(
        '/',
        validationMiddleware(customerSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    router.patch(
        '/:id',
        validationMiddleware(customerSchema.getById, ReqPropertyEnum.Params),
        validationMiddleware(customerSchema.update, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.update(req, res)
    );

    router.delete(
        '/:id',
        validationMiddleware(customerSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.delete(req, res)
    );

    return router;
};