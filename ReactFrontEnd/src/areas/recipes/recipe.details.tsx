import * as React from 'react';
import { drawerDecorator } from '@bx-utils/decorators/drawerDecorator'
import { RouteComponentProps } from "react-router-dom";
import NotExists from '../../lazy/404';
import { useTranslation } from 'react-i18next';
import { ensureApiDataDecorator } from '@bx-utils/decorators/ensureApiDataDecorator';
import RecipyForm from './components/recipy.form';
import { update } from '@bx-utils/ajax';

interface IRecipeDetailsProps extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Areas.Recipes.IRecipe> {

}
const ensureApiData = ensureApiDataDecorator({ });

function RecipeDetailsComponent({ history, location, match, data }: IRecipeDetailsProps) {
    const { t } = useTranslation();

    const goBack = () => {
        history.replace('/recipes/');
    };

    React.useEffect(() => {
        return goBack;
    });

    if (data == null) {
        return <NotExists action={goBack} message={`Sorry we can't find your recipy.`} actionText={'Return to recipy list'} />;
    }

    return (
        <RecipyForm data={data} title={'recipy_details'} cancelAction={goBack} saveAction={data => update('/api/recipes/recipe', data)} />
    );
}

const asDrawer = drawerDecorator('right');

export default asDrawer(ensureApiData(RecipeDetailsComponent));