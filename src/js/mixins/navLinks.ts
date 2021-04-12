export type link = {
    displayName: string;
    routeName: string;
    id: number;
    isLink?: boolean,
    hash?: string
    refName?: string
}

const links: Array<link> = [
    {displayName: 'О технопарке', routeName: 'home', id: 1, hash: 'about', refName: 'about'},
    {displayName: 'Аренда', routeName: 'catalog', id: 2, isLink: true, refName: 'catalog'},
    {displayName: 'Новости', routeName: 'home', id: 3, hash: 'news', refName: 'news'},
    {displayName: 'Контакты', routeName: 'home', id: 4, hash: 'contacts', refName: 'contacts'},
];

export const mixinNavLinks = {
    /* eslint-disable */
    data: (): any => ({
        links
    })
};



