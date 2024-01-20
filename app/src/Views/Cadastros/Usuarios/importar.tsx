
import { ReactNode } from 'react';
import { Upload, TextBox, ViewUpload } from '../../../Utils/Controls';
import { EventArgs } from '../../../Utils/EventArgs';

export class ViewImportar extends ViewUpload {

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
            <Upload Open={this.state.open} Close={this.Close} Cancel={this.Cancel} Confirm={this.Confirm}>
                <input type="file" name="fileUploaded" multiple />
            </Upload>
        );

    }

}