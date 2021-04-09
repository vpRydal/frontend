import {AxiosResponse} from "axios";
import api from "../common/myApi.json";
import http from "@/js/common/http";

class Contact {
    id?: number
    header?: string;
    value?: string;
    type?: string;
    is_rent_department?: boolean;

     static readonly EMAIL = 'email'

    static getList(params: { [key: string]: number | string | undefined } = {}): Promise<AxiosResponse<Contact[]>> {

        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<Contact[]>('contact', { params: params })
        } else {
            return new Promise<AxiosResponse<Contact[]>>((resolve) => {
                resolve({ data: api.contacts } as AxiosResponse<Contact[]>)
            })
        }
    }

}

export default Contact
