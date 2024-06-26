import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/index.base';

export class BankTemplate extends React.Component {

    render() {
        return (
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.description}</span>
                )}
            </ResultContext.Consumer>
        );
    }

}