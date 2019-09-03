import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileUploadComponent from '@bx-components/upload.files';
import {
    TextField,
    Card,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Grid,
    Button,
    makeStyles,
    Theme
} from '@material-ui/core';

interface IRecipeDetailsProps extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Areas.Recipes.IRecipe> {

}

const useStyles = makeStyles((theme: Theme) => ({
    card: {
    },
    media: {
        cursor: 'pointer',
        height: 0,
        paddingTop: '25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

function RecipeDetailsComponent() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [addState, updateRecipeState] = React.useState<{
        recipe: Areas.Recipes.IRecipe
    }>({
        recipe: {
            id: '',
            recipeName: '',
            recipeDescription: '',
            mainFileName: ''
        }
    });

    const updateRecipe = (partialRecipe: Partial<Areas.Recipes.IRecipe>) => {
        updateRecipeState({
            ...addState,
            recipe: { ...addState.recipe, ...partialRecipe }
        });
    };

    const {
        recipeName: name,
        recipeDescription: description,
        mainFileName: imageUrl
    } = addState.recipe;

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label='recipe'>
                        {name[0]}
                    </Avatar>
                }
                title={<TextField
                    label={t('Recipe name')}
                    value={name}
                    fullWidth
                    autoFocus
                    autoComplete={'off'}
                    onChange={e => updateRecipe({ recipeName: e.target.value })} />}
            />
            {
                !!imageUrl ?
                    <CardMedia
                        className={classes.media}
                        image={imageUrl}
                        title={name}
                    /> : null
            }
            <CardContent>
                <TextField
                    label={t('Recipe description')}
                    value={description}
                    fullWidth
                    multiline
                    onChange={e => updateRecipe({ recipeDescription: e.target.value })} />
                <FileUploadComponent onFileAdded={f => {
                    // console.log({ f });
                }} />
            </CardContent>
            <CardActions>
                <Button color='primary' variant='contained' type='submit'>Save</Button>
                <Button>Cancel</Button>
            </CardActions>
        </Card>
    );
}

export default RecipeDetailsComponent;
