import { Country } from './Data/Country';

export const Pesquisa = {

    Country: (Text: string) =>
    {
        return Country.filter((Item) => Item.nome_pais.substr(0, Text.length).toUpperCase() == Text.toUpperCase() || Item.sigla.substr(0, Text.length).toUpperCase() == Text.toUpperCase());
    },
    
}