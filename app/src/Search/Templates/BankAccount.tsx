import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/index.base';

export class BankAccountTemplate extends React.Component {

    render() {
        return (
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.bank?.description} - {args.agency}-{args.agencyDigit} / {args.account}-{args.accountDigit}</span>
                )}
            </ResultContext.Consumer>
        );
    }

}