import { Request, Response } from "express";
import { CustomerService } from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { 
    BodySaveCustomerI, 
    ParamsGetAllCustomersI, 
    ResponseGetAllCustomersI 
} from "../interfaces/customer.interface";
import { CustomError } from "../config/custom-error";
import { 
    DATA_ALREADY_EXIST, 
    REG_DELETED, 
    REG_NOT_FOUND 
} from "../utils/messages";
import { CustomerEntity } from "../entities/typeorm";
import { StatusCodeEnum } from "../enums/status-code.enum";

export class CustomerController {

    constructor(
        private readonly customerServive: CustomerService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllCustomersI;

            const { phoneNumber, email } = query;
            let optionalParams = '';

            if (phoneNumber)
                optionalParams = `AND phone_number LIKE '%${ phoneNumber }%'`;
            else
                optionalParams = `AND phone_number IS NULL`;

            if (email)
                optionalParams += ` AND email LIKE '%${ email }%'`;
            else
                optionalParams += ` AND email IS NULL`;

            const customersData = await this.customerServive.getAll(query, optionalParams);

            let data: ResponseGetAllCustomersI[] = [];

            if (customersData.length > 0)
                data = customersData;

            const [ quantity ] = await this.customerServive.getAllCount(query, optionalParams);

            return res.status(StatusCodeEnum.Ok).json({
                data,
                total: Number(quantity.regs)
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            let [ data ] = await this.customerServive.getById(id);

            if (!data)
                throw CustomError.notFound(REG_NOT_FOUND(`Customer id '${ id }'`));

            return res.status(StatusCodeEnum.Ok).json(data);
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveCustomerI;

            const { documentNumber } = payload;

            const [ docNumberData ] = await this.customerServive.getByDocNumber(documentNumber);

            if (docNumberData) 
                throw CustomError.badRequest(DATA_ALREADY_EXIST(`documentNumber '${ documentNumber }'`));

            const customer = payload as CustomerEntity;

            const { id } = await this.customerServive.insert(customer);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id      = Number(req.params.id);
            const payload = req.body as BodySaveCustomerI;

            const [ customerData ] = await this.customerServive.getById(id);

            if (!customerData)
                throw CustomError.notFound(REG_NOT_FOUND(`Customer id '${ id }'`));

            const { documentNumber } = payload;

            const [ docNumberData ] = await this.customerServive.getByDocNumber(documentNumber);

            if (docNumberData) {
                if (docNumberData.documentNumber !== documentNumber)
                    throw CustomError.badRequest(DATA_ALREADY_EXIST(`documentNumber '${ documentNumber }'`));
            }

            const customer = payload as CustomerEntity;

            await this.customerServive.update(id, customer);

            return res.status(StatusCodeEnum.Ok).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const [ customerData ] = await this.customerServive.getById(id);

            if (!customerData)
                throw CustomError.notFound(REG_NOT_FOUND(`Customer id '${ id }'`));

            await this.customerServive.delete(id);

            return res.status(StatusCodeEnum.Ok).json({ message: REG_DELETED });
        } catch (error) {
            resError(error, res);
        }
    }

}