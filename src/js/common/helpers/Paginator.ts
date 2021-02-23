import {paginatorLinks, paginatorMeta} from "@/js/common/types";
import BaseModel from "@/js/models/BaseModel";

export default class Paginator<T = BaseModel> {
    data: Array<T> | []
    links?: paginatorLinks
    meta?: paginatorMeta
    currentPage = 1;
    itemsOnPage = 0;
    totalItems = 0;
    totalPages = 0;

    constructor(links: paginatorLinks | undefined = undefined, meta: paginatorMeta | undefined = undefined, data: Array<T> | [] = []) {
        this.data = data
        this.links = links
        this.meta = meta
    }

    static initPaginator(paginator: Paginator): void {
        paginator.totalItems = paginator.meta?.total as number
        paginator.currentPage = paginator.meta?.current_page as number
        paginator.itemsOnPage = paginator.meta?.per_page as number
        paginator.totalPages = paginator.meta?.last_page as number
    }
}
