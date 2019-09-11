import { Typography, Box } from '@material-ui/core';
import * as React from 'react';

interface ITabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

export default function TabPanel(props: ITabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component='div'
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}
