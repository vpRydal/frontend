import {AxiosResponse} from "axios";
import api from "./myApi.json";

class News {
    img?: string;
    title?: string;
    text?: string;
    createdAt?: string;

    /* eslint-disable */
    static get(options?:any): Promise<AxiosResponse<News[]>> {
        return new Promise<AxiosResponse<News[]>>((resolve) => {
            resolve({ data: api.news } as AxiosResponse<News[]>)
        })
    }
}

export default News
