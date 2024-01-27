import { ReactNode } from 'react';
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

    public Clear = () => undefined;

    public Confirm = () => this.state.filter;
   
    public render(): ReactNode {

        return (
            <Filter Open={this.state.open} Title="Filtro" Close={this.Close} Clear={this.Clear} Confirm={this.Confirm}>
                <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.filter.nome} OnChange={(args: EventArgs) => this.setState({filter: {...this.state.filter, nome: args.Value}})} />
                <TextBox Label='Email' TextTransform='LowerCase' Text={this.state.filter.email} OnChange={(args: EventArgs) => this.setState({filter: {...this.state.filter, email: args.Value}})} />
            </Filter>
        );

    }

}