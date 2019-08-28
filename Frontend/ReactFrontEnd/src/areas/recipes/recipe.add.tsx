import * as React from 'react';
import { drawerDecorator } from '@bx-utils/decorators/drawerDecorator'
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RecipyForm from './components/recipy.form';
import { post } from '@bx-utils/ajax';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

interface IRecipeDetailsProps extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Areas.Recipes.IRecipe> {

}

function RecipeDetailsComponent({ history, location }: IRecipeDetailsProps) {
    const { t } = useTranslation();

    const data: Areas.Recipes.IRecipe = {
        id: 0,
        recipeName: '',
        mainFileName: ''
    };

    const [recipeForm, updateForm] = React.useState({
        activeStep: 0
    });

    return (
        <div>
            <Stepper activeStep={recipeForm.activeStep} orientation='vertical'>
                <Step key={'step1'}>
                    <StepLabel>{t('Recipe name')}</StepLabel>
                    <StepContent>
                        <div>step 1</div>
                    </StepContent>
                </Step>
                <Step key={'step2'}>
                    <StepLabel>{'step2'}</StepLabel>
                    <StepContent>
                        <div>step 2</div>
                    </StepContent>
                </Step>
                <Step key={'step3'}>
                    <StepLabel>{'step3'}</StepLabel>
                    <StepContent>
                        <div>step 3</div>
                    </StepContent>
                </Step>
            </Stepper>
        </div>
        // <RecipyForm
        //     data={data}
        //     title={'recipy_add'}
        //     cancelAction={goBack}
        //     saveAction={returnData => post('/api/recipes/list', returnData)} />
    );
}

export default RecipeDetailsComponent;
