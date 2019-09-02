import * as React from 'react';
import Search from '@bx-components/query.search';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import RecipeList from './recipe.list';
import recipeAdd from './recipe.add';
import NoteAddRounded from '@material-ui/icons/NoteAddRounded';
import RecipeCookComponent from './components/recipy.cook';


interface IRecipeListProps
    extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Utils.Api.IQueryResponse<Areas.Recipes.IRecipe>> {
}

export default function RecipesComponent({ history, match, location }: IRecipeListProps) {
    console.log(match);

    return (
        <div>
            <Search
                queryKey='search'
                helperText='Search your recipes'
                onSearch={newSearch => history.push(`${match.url}/list?search=${newSearch}`)}
                onType={newSearch => history.push(`${match.url}/list?search=${newSearch}`)}
                onEscape={() => history.replace(`${match.url}/list?search=`)}
                actions={
                    [
                        {
                            tooltip: 'Add new recipe',
                            icon: <NoteAddRounded />,
                            color: 'secondary',
                            onClick: e => {
                                e.preventDefault();
                                e.stopPropagation();
                                history.push(`${match.url}/add`);
                            }
                        }
                    ]}
            />
            <Divider style={{ marginBottom: 10 }} />
            <Route
                path={`${match.url}/list`}
                component={RecipeList} />
            <Route
                path={`${match.url}/add`}
                component={recipeAdd} />
            <Route
                path={`${match.url}/cook/:id`}
                component={RecipeCookComponent} />
        </div>
    );
}
