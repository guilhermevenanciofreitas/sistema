import React from 'react';
import { ResultContext } from '../base';

export class CountryTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span><b>{args.nome_pais}</b> - {args.sigla}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}