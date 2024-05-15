
import { ViewProductCategoryBase } from './index.base';
import { Button, Form, ViewModal, TextBox, Content, Actions } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import React from 'react';
import { color } from '../../../../Utils/color';
import { TaskAltOutlined } from '@mui/icons-material';

export class ViewProductCategory extends ViewProductCategoryBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={450}>
                <Content>
                    <TextBox Label='Descrição' TextTransform='UpperCase' Text={this.state.description} OnChange={(args: EventArgs) => this.setState({description: args.Value})} />
                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
            </ViewModal>
        );

    }

}