export type link = {
    displayName: string;
    routeName: string;
}

const links: Array<link> = [
    {displayName: 'Главная', routeName: 'index'},
    {displayName: 'Аренда', routeName: 'index'},
    {displayName: 'Новости', routeName: 'index'},
    {displayName: 'Контакты', routeName: 'index'},
];

export const mixinNavLinks = {
    data: () => ({
        links
    })
};



