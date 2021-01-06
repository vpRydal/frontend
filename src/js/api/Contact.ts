import {AxiosResponse} from "axios";
import api from "./myApi.json";

class Contact {
    id?: number
    title?: string;
    text?: string;
    is_rent_depart?: boolean;

    /* eslint-disable */
    static getList(options?:any): Promise<AxiosResponse<Contact[]>> {
        return new Promise<AxiosResponse<Contact[]>>((resolve) => {
            resolve({ data: api.contacts } as AxiosResponse<Contact[]>)
        })
    }
}

export default Contact