import * as React from 'react';
import { useTranslation } from 'react-i18next';
import TabPanel from '@bx-components/tab.panel';
import RecipeProducts from './components/recipe.products';
import FormComponent from '@bx-components/form.consumer';
import AddRecipeModel from './models/add.recipe.model';
import { createNewRecipe } from '@bx-services/recipe/recipe.service';

import {
    TextField,
    Card,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    makeStyles,
    Theme,
    createStyles,
    Tabs,
    Tab,
} from '@material-ui/core';
import FileUploadComponent from '@bx-components/upload.files';

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
        selectedTab: number,
    }>({
        selectedTab: 0
    });

    const { selectedTab } = addState;

    const defaultRecipe: Areas.Recipes.IRecipe = {
        id: '',
        recipeName: 'Rosół na bidaka',
        recipeDescription: 'Do Wodę dodaj Kurczaka',
        mainFileName: '',
        products: ['Woda', 'Kurczak']
    };

    return (
        <FormComponent
            validator={AddRecipeModel}
            onSubmit={async (model) => { await createNewRecipe(model); }}
            model={defaultRecipe}>
            {({ model, updateModel, validation }) => {
                const {
                    recipeName: name,
                    products,
                    recipeDescription: description,
                    mainFileName: imageUrl } = model;

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
                                onChange={e => updateModel({ recipeName: e.target.value })} />}
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
                                onChange={e => updateModel({ recipeDescription: e.target.value })} />

                            <Tabs
                                value={selectedTab}
                                indicatorColor='primary'
                                textColor='primary'
                                onChange={(a, tab) => { updateRecipeState({ ...addState, selectedTab: tab }); }}
                            >
                                <Tab label={t('ProductsTab')} disabled />
                                <Tab label={t('ImagesTab')} />
                                <Tab label={t('RecipeStepsTab')} />
                            </Tabs>
                            <div>
                                <TabPanel value={0} index={selectedTab}>
                                    <RecipeProducts products={products} />
                                </TabPanel>
                                <TabPanel value={1} index={selectedTab}>
                                    <FileUploadComponent maxFiles={5} onFileAdded={() => {
                                        // console.log({ f });
                                    }} />
                                </TabPanel>
                                <TabPanel value={2} index={selectedTab}>
                                    tab 3
                        </TabPanel>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                disabled={!!validation.invalid}
                                color='primary'
                                variant='contained'
                                type='submit'>{t('Save')}</Button>
                            <Button>{t('Cancel')}</Button>
                        </CardActions>
                    </Card>
                );
            }
            }
        </FormComponent>
    );
}

export default RecipeDetailsComponent;
