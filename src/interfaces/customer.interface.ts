interface ParamsGetAllCustomersI {
    documentNumber: string;
    name          : string;
    lastName      : string;
    age           : number;
    phoneNumber   : string;
    email         : string;
    status        : number;
    limit         : number;
    skip          : number;
}

interface ResponseGetAllCustomersI {
    id            : number;
    documentNumber: string;
    name          : string;
    lastName      : string;
    age           : number;
    phoneNumber   : string;
    email         : string;
    status        : number;
}

interface ResponseGetByIdCustomerI extends ResponseGetAllCustomersI {}

interface BodySaveCustomerI {
    documentNumber: string;
    name          : string;
    lastName      : string;
    age           : number;
    phoneNumber   : string;
    email         : string;
    status        : number | boolean;
}

export {
    ParamsGetAllCustomersI,
    ResponseGetAllCustomersI,
    ResponseGetByIdCustomerI,
    BodySaveCustomerI,
};