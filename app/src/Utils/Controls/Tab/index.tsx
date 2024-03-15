import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import { TabItem } from '..';
import { ControlTabItem } from './TabItem';

export class ControlTab extends React.Component<Readonly<{children?: any}>> {

    render(): React.ReactNode {
        return (
            <Tabs variant="outlined" defaultValue={0} sx={{width: '100%', borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto'}}>
              <TabList
                variant="soft"
                sx={{
                    overflow: 'auto',
                    scrollSnapType: 'x mandatory',
                    '&::-webkit-scrollbar': { display: 'none' },
                    [`& .${tabClasses.root}`]: {
                        '&[aria-selected="true"]': {
                        bgcolor: 'background.surface',
                        borderColor: 'divider',
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            height: 2,
                            bottom: -2,
                            left: 0,
                            right: 0,
                            bgcolor: 'background.surface',
                        },
                        },
                    },
                }}
              >

                {this.props.children.map((TabItem: TabItem, index: any) => {
                  return <div style={{display: TabItem.props.Visible ? 'block' : 'none'}}><Tab disableIndicator variant="soft" key={index}>{TabItem.props.Title}</Tab></div>;
                })}

              </TabList>

              {this.props.children.map((TabItem: TabItem, index: any) => {
                return <div style={{display: TabItem.props.Visible ? 'block' : 'none'}}><TabPanel value={index}>{TabItem.props.children}</TabPanel></div>;
              })}

            </Tabs>
        );
    }
}