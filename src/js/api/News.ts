import {AxiosResponse} from "axios";
import api from "./myApi.json";

class News {
    photo?: string;
    header?: string;
    content?: string;

    /* eslint-disable */
    static getList(options?:any): Promise<AxiosResponse<News[]>> {
        return new Promise<AxiosResponse<News[]>>((resolve) => {
            resolve({ data: api.news } as AxiosResponse<News[]>)
        })
    }
}

export default News
