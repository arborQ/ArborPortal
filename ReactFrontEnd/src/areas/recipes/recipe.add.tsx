import * as React from 'react';
import { drawerDecorator } from '@bx-utils/decorators/drawerDecorator'
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import RecipyForm from './components/recipy.form';


interface IRecipeDetailsProps extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Areas.Recipes.IRecipe> {

}

function RecipeDetailsComponent({ history, location }: IRecipeDetailsProps) {
    const { t } = useTranslation();

    const goBack = () => {
        history.replace('/recipes/');
    };

    React.useEffect(() => {
        return goBack;
    });

    const data: Areas.Recipes.IRecipe = {
        id: 0,
        recipeName: ''
    };

    return (
        <RecipyForm data={data} title={'recipy_add'} cancelAction={goBack} saveAction={data => { console.log(data); }} />
    );
}

const asDrawer = drawerDecorator('left');

export default asDrawer(RecipeDetailsComponent);