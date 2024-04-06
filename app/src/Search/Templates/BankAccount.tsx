import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/base';

export class BankAccountTemplate extends React.Component {

    render() {
        return (
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.bank?.description} Ag. {args.agency}-{args.agencyDigit} / {args.account}-{args.accountDigit}</span>
                )}
            </ResultContext.Consumer>
        );
    }

}