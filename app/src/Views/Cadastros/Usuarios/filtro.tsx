
import { ReactNode } from 'react';
import { ControlViewFilter } from '../../../Utils/Controls/ViewFilter';
import { Filter, TextBox, ViewFilter } from '../../../Utils/Controls';
import { EventArgs } from '../../../Utils/EventArgs';

export class ViewFiltro extends ViewFilter {

    state = {
        open: false,

        filter: {
            nome: "",
            email: "",
        }
    }

    public Close = () => this.setState({open: false});
 
    public render(): ReactNode {

        return (
            <Filter Open={this.state.open} Close={this.Close} Clear={this.Clear} Confirm={this.Confirm}>
                <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.filter.nome} OnChange={(args: EventArgs) => this.setState({filter: {nome: args.Value}})} />
                <TextBox Label='Email' TextTransform='LowerCase' Text={this.state.filter.email} OnChange={(args: EventArgs) => this.setState({filter: {email: args.Value}})} />
            </Filter>
        );

    }

}