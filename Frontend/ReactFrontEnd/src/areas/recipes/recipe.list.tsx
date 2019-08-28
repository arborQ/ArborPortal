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
import Search from '@bx-components/search';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { ensureApiDataDecorator } from '@bx-utils/decorators/ensureApiDataDecorator';
import { Divider } from '@material-ui/core';
import { parse as parseSearch } from 'query-string';
import { useTranslation } from 'react-i18next';
import ErrorComponent from '@bx-components/error';

interface IRecipeListProps
    extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Utils.Api.IQueryResponse<Areas.Recipes.IRecipe>> {
}

interface ISearchQueryParams {
    search?: string;
}

const ensureApiData = ensureApiDataDecorator({ url: '/recipes' });
function RecipesComponent({ data, reloadDataCallback, location, history }: IRecipeListProps) {
    const { search } = parseSearch(location.search) as ISearchQueryParams;
    const items = data.items.filter(r => !search || r.recipeName.indexOf(search) !== -1);
    const { t } = useTranslation();

    if (items.length === 0) {
        return (
            <ErrorComponent
                message={!!search ? `Can't find any recipes for '${search}'` : 'No Data'}
                code='???'
                actionText='Add new recipe'
                action={() => { history.replace('/recipes/add'); }} />
        );
    }

    return (
        <Paper>
            <List>
                {items.map(value => {
                    const labelId = `checkbox-list-secondary-label-${value.id}`;

                    return (
                        <ListItem key={value.id} button >
                            <ListItemAvatar>
                                <Avatar
                                    alt={value.recipeName}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={value.recipeName} />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default ensureApiData(RecipesComponent);
