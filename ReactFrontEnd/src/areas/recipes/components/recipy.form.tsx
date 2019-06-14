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

interface IRecipyFormProps {
    data: Areas.Recipes.IRecipe;

    title: string;
    saveAction: (data: Areas.Recipes.IRecipe) => void | Promise<void>;
    cancelAction: () => void | Promise<void>;
}

export default function ({ data, title, saveAction, cancelAction }: IRecipyFormProps) {
    const { t } = useTranslation();

    const [recipeName, changeRecipeName] = React.useState(data.recipeName || '');
    const [mainFileName, addFileName] = React.useState<string>(data.mainFileName || '');

    const saveTranslation = t('Save');
    const cancelTranslation = t('Cancel');

    return (
        <div>
            <Typography variant='h4' component='h2' style={{ padding: 10 }}>
                {t(title)}
            </Typography>
            <Divider />
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <Card>
                    <CardContent>
                        <TextField
                            id='recipeName'
                            label={t('recipeNameTranslation')}
                            value={recipeName}
                            fullWidth
                            margin='normal'
                            onChange={async (e) => { changeRecipeName(e.target.value); }}
                        />
                        <UploadImage maxFiles={1} onFileAdded={(fileName) => { addFileName(fileName); }} />
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='contained' color='primary' type='submit' onClick={() => {
                            saveAction({
                                id: data.id, recipeName, mainFileName
                            });
                        }}>
                            {saveTranslation} {`File: ${mainFileName.length}`}
                        </Button>
                        <Button size='small' variant='contained' onClick={cancelAction}>
                            {cancelTranslation}
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </div>
    );
}
