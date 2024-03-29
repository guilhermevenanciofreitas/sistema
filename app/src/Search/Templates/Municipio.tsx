import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/base';

export class MunicipioTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.nome}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}