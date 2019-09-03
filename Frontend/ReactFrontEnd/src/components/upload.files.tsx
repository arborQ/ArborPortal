import * as React from 'react';
import * as Dropzone from 'dropzone';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface IUploadFileProps {
    onFileAdded: (fileName: string) => void;
    maxFiles?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
    dropzone: {
        'border': `2px dashed ${theme.palette.primary.main}`,
        'border-radius': '5px',
        'background-color': 'white',
        'min-height': '100px',
        'cursor': 'pointer'
    },
    text: {
        'font-size': '0.9em',
        'color': theme.palette.text.primary,
    },
}));

export default function FileUploadComponent(props: IUploadFileProps) {
    const { t } = useTranslation();
    const [registered, register] = React.useState(false);
    const classes = useStyles();

    function registerDropzone(element: HTMLDivElement) {
        if (!registered) {
            const dropzone = new Dropzone(element, {
                url: '/api/files/upload',
                dictDefaultMessage: t('uploadImages'),
                maxFiles: props.maxFiles,
                init() {
                    this.on('success', (e, b: Utils.Api.ICreateResponse<string>) => {
                        if (b.isSuccessful) {
                            props.onFileAdded(b.createdItem);
                        }
                    });
                }
            });

            register(!!dropzone);
        }
    }

    return (
        <div
            className={`dropzone ${classes.dropzone}`}
            ref={element => { if (!!element) { registerDropzone(element); } }}>
        </div>
    );
}
