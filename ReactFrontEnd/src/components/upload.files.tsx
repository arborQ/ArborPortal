import * as React from 'react';
import * as Dropzone from "dropzone";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import './css/dropzone.css';

const DropContainer = styled.div.attrs({
    className: 'dropzone'
})`
    border: 2px dashed #0087F7;
    border-radius: 5px;
    background: white;
    min-height: 100px;
    cursor: pointer;
`;


const DropText = styled.span`
    font-size: 0.9em;
    color: #ccc;
`;

export default function () {
    const { t } = useTranslation();
    const [containerElement, registerContainer] = React.useState<HTMLDivElement | null>(null);

    if (containerElement !== null) {
        console.log(Dropzone);
        new Dropzone(containerElement, { url: '/lol', dictDefaultMessage: t('uploadImages') })
    }

    return (
        <DropContainer ref={registerContainer}>
        </DropContainer>
    );
}