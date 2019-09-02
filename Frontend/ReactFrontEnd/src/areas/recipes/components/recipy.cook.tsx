import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import UploadImage from '@bx-components/upload.files';
import { useTranslation } from 'react-i18next';

interface IRecipyCookProps {

}

export default function RecipeCookComponent({ }: IRecipyCookProps) {
    const { t } = useTranslation();

    return (
        <div>
            <Typography variant='h4' component='h2' style={{ padding: 10 }}>
                {t('title')}
            </Typography>
            <Divider />
        </div>
    );
}
