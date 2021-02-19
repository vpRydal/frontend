import {AxiosResponse} from "axios";
import api from "../common/myApi.json";

class Contact {
    id?: number
    header?: string;
    content?: string;
    type?: string;
    is_rent_depart?: boolean;

     static readonly EMAIL = 'email'

    /* eslint-disable */
    static getList(options?:any): Promise<AxiosResponse<Contact[]>> {
        return new Promise<AxiosResponse<Contact[]>>((resolve) => {
            resolve({ data: api.contacts } as AxiosResponse<Contact[]>)
        })
    }
}

export default Contact
