import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/base';

export class FuncionarioTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.cpfCnpj} - {args.nome}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}