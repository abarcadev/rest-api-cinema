import { DeleteResult, UpdateResult } from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { CustomerEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllCustomersI, 
    ResponseGetAllCustomersI, 
    ResponseGetByIdCustomerI 
} from "../../interfaces/customer.interface";

export class CustomerService {

    private readonly customerRepository = dbConnection.getRepository(CustomerEntity);

    getAll(params: ParamsGetAllCustomersI, optionalParams: string): Promise<ResponseGetAllCustomersI[]> {
        return this.customerRepository.query(
            `
            SELECT 
                id,
                document_number AS documentNumber,
                name,
                last_name AS lastName,
                age,
                phone_number AS phoneNumber,
                email,
                status
            FROM
                customers
            WHERE 
                document_number LIKE ?
            AND name LIKE ?
            AND last_name LIKE ?
            AND age LIKE ?
            AND status LIKE ? ${ optionalParams }
            ORDER BY id
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.documentNumber }%`,
                `%${ params.name }%`,
                `%${ params.lastName }%`,
                `%${ params.age }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getAllCount(params: ParamsGetAllCustomersI, optionalParams: string): Promise<any[]> {
        return this.customerRepository.query(
            `
            SELECT 
                COUNT(*) AS regs
            FROM
                customers
            WHERE 
                document_number LIKE ?
            AND name LIKE ?
            AND last_name LIKE ?
            AND age LIKE ?
            AND status LIKE ? ${ optionalParams };
            `,
            [
                `%${ params.documentNumber }%`,
                `%${ params.name }%`,
                `%${ params.lastName }%`,
                `%${ params.age }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getById(id: number): Promise<ResponseGetByIdCustomerI[]> {
        return this.customerRepository.query(
            `
            SELECT 
                id,
                document_number AS documentNumber,
                name,
                last_name AS lastName,
                age,
                phone_number AS phoneNumber,
                email,
                status
            FROM
                customers
            WHERE 
                id = ?;
            `,
            [ id ]
        );
    }
    
    getByDocNumber(documentNumber: string): Promise<ResponseGetByIdCustomerI[]> {
        return this.customerRepository.query(
            `
            SELECT 
                id,
                document_number AS documentNumber,
                name,
                last_name AS lastName,
                age,
                phone_number AS phoneNumber,
                email,
                status
            FROM
                customers
            WHERE 
                document_number = ?;
            `,
            [ documentNumber ]
        );
    }

    insert(customer: CustomerEntity): Promise<CustomerEntity> {
        return this.customerRepository.save(customer);
    }

    update(id: number, customer: CustomerEntity): Promise<UpdateResult> {
        return this.customerRepository.update({ id }, customer);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.customerRepository.delete({ id });
    }

}