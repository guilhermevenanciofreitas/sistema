
import { ViewLocationBase } from './index.base';
import { Button, Form, ViewModal, TextBox, Content, Actions } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { color } from '../../../../Utils/color';
import { TaskAltOutlined } from '@mui/icons-material';

export class ViewLocation extends ViewLocationBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={400}>
                <Content>
                    <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                    <TextBox Label='Descrição' TextTransform='LowerCase' Text={this.state.description} OnChange={(args: EventArgs) => this.setState({description: args.Value})} />
                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
            </ViewModal>
        );

    }

}