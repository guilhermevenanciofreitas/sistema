import ReactDOM from 'react-dom/client';
import { DialogContent, DialogTitle, Divider, IconButton, Modal, ModalDialog } from "@mui/joy";
import { Close, HelpRounded, InfoRounded, Warning, CheckCircleRounded, ErrorRounded } from '@mui/icons-material';
import { Button } from '..';

class Options {
    title?: string;
    type?: "Information" | "Warning" | "Question" | "Success" | "Error";
    width?: number;
    content?: any;
    container?: any;
    buttons?: any;
}

export class ControlMessageBox {

    public static Show = async (options: Options): Promise<any> =>
    {

        return new Promise<any>(resolve => {
            
            const container: any = "#message-box";

            const containerElement = ReactDOM.createRoot(document.querySelector(container));
      
            if (!containerElement) throw Error(`can't find container ${container}`);
      
            const handleClose = (value: any) => {
              let result = null;
              if (value) {
                result = value;
              }
              containerElement.unmount();
              return resolve(result);
            };
      
            const handleButton = (handler: Function) => () => {
                handleClose(handler());
            };
      
            containerElement.render(
              <Modal open={true} onClose={handleClose} style={{zIndex: 10000}} >
                  <ModalDialog  minWidth={options.width} {...{sx: {top: '250px'}}}>
                        <DialogTitle>{options.title}</DialogTitle>
                        <IconButton onClick={handleClose} sx={{position: 'absolute', right: 8, top: 8}}><Close /></IconButton>
                        <Divider></Divider>
                        <DialogContent>
                            {options.type && (
                                <div style={{width: '100%'}}>
                                    <div style={{float: 'left', width: '20px'}}>
                                        {options.type == "Information" && <InfoRounded fontSize='large' color='primary' />}
                                        {options.type == "Question" && <HelpRounded fontSize='large' color='primary' />}
                                        {options.type == "Warning" && <Warning fontSize='large' color='warning' />}
                                        {options.type == "Success" && <CheckCircleRounded fontSize='large' color='success' />}
                                        {options.type == "Error" && <ErrorRounded fontSize='large' color='error' />}
                                    </div>
                                    <div style={{float: 'right', width: 'calc(100% - 45px)', marginTop: '5px', textAlign: 'left'}}>{options.content}</div>
                                </div>
                            )}
                            {!options.type && options.content}
                            <Divider></Divider>
                            <div style={{flexDirection: 'column', textAlign: 'right', marginTop: '10px'}}>
                                {options.buttons.map((btn: any) => {
                                    return (
                                        <Button Text={btn.Text} OnClick={handleButton(btn.OnClick || (() => null))} key={btn.Text}></Button>
                                    );
                                })}
                            </div>
                        </DialogContent>
                  </ModalDialog>
              </Modal>
            );
          });

    }
}