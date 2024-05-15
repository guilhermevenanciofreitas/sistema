import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/index.base';

export class EconomicActivityTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.cnae} - {args.name}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}