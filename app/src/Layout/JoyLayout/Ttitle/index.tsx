import { Box, Typography } from "@mui/joy";
import React from "react";

export class Title extends React.Component<Readonly<{children: string}>> {

    render(): React.ReactNode {

        return(
            <Box sx={{ display: 'flex', my: 1, gap: 1, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'start', sm: 'center' }, flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <Typography level="h3">{this.props.children}</Typography>
            </Box>
        );

    }
}