import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/index.base';

export class EmployeeTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.cpfCnpj} - {args.surname}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}