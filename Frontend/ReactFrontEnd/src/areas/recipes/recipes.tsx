import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CachedIcon from '@material-ui/icons/Cached';
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';
import Search from '@bx-components/query.search';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { ensureApiDataDecorator } from '@bx-utils/decorators/ensureApiDataDecorator';
import { Divider } from '@material-ui/core';
import { parse as parseSearch } from 'query-string';
import RecipeList from './recipe.list';
import recipeAdd from './recipe.add';
interface IRecipeListProps
    extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Utils.Api.IQueryResponse<Areas.Recipes.IRecipe>> {
}

interface ISearchQueryParams {
    search?: string;
}

export default function RecipesComponent({ data, reloadDataCallback, location, history }: IRecipeListProps) {
    const { search } = parseSearch(location.search) as ISearchQueryParams;

    return (
        <div>
            <Search
                queryKey='search'
                helperText='Search your recipes'
                onSearch={newSearch => history.push(`/recipes/list?search=${newSearch}`)}
                onType={newSearch => history.push(`/recipes/list?search=${newSearch}`)}
                onEscape={() => history.replace('/recipes/list?search=')} />
            <Divider style={{ marginBottom: 10 }} />
            <Route
                path='/recipes/list'
                component={RecipeList} />
            <Route
                path='/recipes/add'
                component={recipeAdd} />
        </div>
    );
}
