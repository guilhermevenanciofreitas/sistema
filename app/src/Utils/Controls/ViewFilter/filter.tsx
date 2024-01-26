import React from "react";
import { DialogContent, DialogTitle, Divider, Drawer, ModalClose, Sheet, Stack } from "@mui/joy";
import { Button } from "..";
import { Done } from "@mui/icons-material";

export class ControlFilter extends React.Component<Readonly<{children: any, Open: boolean, Title: string, Close: any, Clear: any, Confirm: any}>> {

    render(): React.ReactNode {
        return(
            <Drawer size="md" variant="plain" anchor='right' open={this.props.Open} onClose={() => this.props.Close(null)} style={{zIndex: 10000}}
                slotProps={{content: {sx: {bgcolor: 'transparent', p: { md: 3, sm: 0 }, boxShadow: 'none'}}}}>

                <div style={{paddingTop: '50px'}}>
                    <Sheet sx={{borderRadius: 'md', p: 2, display: 'flex', flexDirection: 'column', gap: 2, height: '100%', overflow: 'auto'}}>
                        <DialogTitle>{this.props.Title}</DialogTitle>
                        <ModalClose />
                        <Divider sx={{ mt: 'auto' }} />
                        <DialogContent>
                            {this.props.children}
                        </DialogContent>
                        <Divider sx={{ mt: 'auto' }} />
                        <Stack direction="row" justifyContent="space-between" useFlexGap spacing={1}>
                            <Button Text='Limpar' Type='Button' Color='black' BackgroundColor='transparent' OnClick={() => this.props.Close(this.props.Clear())} />
                            <Button Text='Confirmar' Type='Button' Color='white' BackgroundColor='green' StartIcon={<Done />} OnClick={() => this.props.Close(this.props.Confirm())} />
                        </Stack>
                    </Sheet>
                </div>
                
            </Drawer>
        );
    }

}