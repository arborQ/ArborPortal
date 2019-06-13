import * as React from 'react';
import * as Dropzone from 'dropzone';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const DropContainer = styled.div.attrs({
    className: 'dropzone'
})`
    border: 2px dashed #0087F7;
    border-radius: 5px;
    background: white;
    min-height: 100px;
    max-width: 650px;
    cursor: pointer;
`;

const DropText = styled.span`
    font-size: 0.9em;
    color: #ccc;
`;

export default function () {
    const { t } = useTranslation();
    const [registered, register] = React.useState(false);

    function registerDropzone(element: HTMLDivElement) {
        if (!registered) {
            const dropzone = new Dropzone(element, {
                url: '/api/files/upload',
                dictDefaultMessage: t('uploadImages'),
                init () {
                    this.on('success', (e) => { console.log('success', e); });
                }
            });

            register(!!dropzone);
        }
    }

    return (
        <DropContainer ref={element => { if (!!element) { registerDropzone(element); } }}>
        </DropContainer>
    );
}
