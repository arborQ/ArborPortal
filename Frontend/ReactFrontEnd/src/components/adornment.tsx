import * as React from 'react';
import { InputAdornment, Tooltip, Zoom } from '@material-ui/core';
import NotValidIcon from '@material-ui/icons/ThumbDown';
import ValidIcon from '@material-ui/icons/ThumbUp';
import { useTranslation } from 'react-i18next';

function Adornment({ message, children }: { message: string, children: any }) {
    const { t } = useTranslation();

    return (
        <InputAdornment position='end'>
            <Tooltip TransitionComponent={Zoom} title={t(message)}>
                {children}
            </Tooltip>
        </InputAdornment>
    );
}

export function ErrorAdornment(
    { message, size = 'small' }
        : { message: string, size?: 'inherit' | 'default' | 'small' | 'large' }) {
    return (
        <Adornment message={message}>
            <NotValidIcon color='error' fontSize={size} />
        </Adornment>
    );
}

export function SuccessAdornment() {
    return (
        <Adornment message={'Ok message'}>
            <ValidIcon color='secondary' fontSize='small' />
        </Adornment>
    );
}
