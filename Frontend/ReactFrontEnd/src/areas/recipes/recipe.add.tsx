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
    Theme,
    Chip,
    Box,
    createStyles
} from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';

interface IRecipeDetailsProps extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Areas.Recipes.IRecipe> {

}

const useChipStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'start',
            flexWrap: 'wrap',
            marginLeft: -theme.spacing(1),
            marginRight: -theme.spacing(1),
        },
        chip: {
            margin: theme.spacing(1),
        },
        avatar: {
            width: '2.5em',
            height: '2.5em',
        }
    }),
);

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
    const chipClasses = useChipStyles();
    const { t } = useTranslation();
    const [addState, updateRecipeState] = React.useState<{
        recipe: Areas.Recipes.IRecipe
    }>({
        recipe: {
            id: '',
            recipeName: '',
            recipeDescription: 'Do @Woda dodaj @Kurczak',
            mainFileName: '',
            products: ['Woda', 'Kurczak']
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
        mainFileName: imageUrl,
        products
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
                <Box className={chipClasses.root}>
                    {
                        products.map(p => (
                            <Chip
                                color='primary'
                                size='small'
                                label={p}
                                clickable
                                className={chipClasses.chip}
                                onDelete={() => { }}
                                avatar={(
                                    <Avatar className={chipClasses.avatar}>
                                        <FastfoodIcon />
                                    </Avatar>
                                )} />
                        ))
                    }
                </Box>
                {/* <FileUploadComponent onFileAdded={f => {
                    // console.log({ f });
                }} /> */}
            </CardContent>
            <CardActions>
                <Button color='primary' variant='contained' type='submit'>Save</Button>
                <Button>Cancel</Button>
            </CardActions>
        </Card>
    );
}

export default RecipeDetailsComponent;
