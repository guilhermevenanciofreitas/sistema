import { Service } from "../Service"

export const Search = {

    Cliente: async (Search: string) =>
    {
        return (await Service.Post("search/cliente", {Search}))?.data;
    },

    TabelaPreco: async (Search: string) =>
    {
        return (await Service.Post("search/tabelasPreco", {Search}))?.data;
    },

    Produto: async (Search: string) =>
    {
        return (await Service.Post("search/produto", {Search}))?.data;
    },

    Municipio: async (Search: string, estadoId: string) =>
    {
        return (await Service.Post("search/municipio", {Search, estadoId}))?.data;
    },
    
    
}