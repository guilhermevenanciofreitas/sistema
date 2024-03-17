import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/base';

export class TipoEntregaTemplate extends React.Component {

    render() {
        return (
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.descricao}</span>
                )}
            </ResultContext.Consumer>
        );
    }

}