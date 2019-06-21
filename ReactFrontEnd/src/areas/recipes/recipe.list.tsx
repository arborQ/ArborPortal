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

import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { ensureApiDataDecorator } from '@bx-utils/decorators/ensureApiDataDecorator';

interface IRecipeListProps
    extends RouteComponentProps, Utils.Decorators.ILoadDataProps<Utils.Api.IQueryResponse<Areas.Recipes.IRecipe>> {
}

function ActionMenu({ path, refresh }) {
    return (
        <BottomNavigation showLabels={false} >
            <BottomNavigationAction label='Create' icon={<Link to={`${path}/add`}><AddIcon /></Link>} />
            <BottomNavigationAction label='Copy' icon={<FileCopyIcon />} />
            <BottomNavigationAction label='Refresh' icon={<CachedIcon />} onClick={refresh} />
        </BottomNavigation>
    );
}

const ensureApiData = ensureApiDataDecorator({ url: '/recipes/recipe' });
function RecipesComponent({ data, reloadDataCallback, match, history }: IRecipeListProps) {
    return (
        <div>
            <Paper>
                <ActionMenu path={match.path} refresh={reloadDataCallback} />
                <List>
                    {data.items.map(value => {
                        const labelId = `checkbox-list-secondary-label-${value.id}`;

                        return (
                            <ListItem key={value.id} button >
                                <ListItemAvatar>
                                    <Avatar
                                        alt={value.recipeName}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={value.recipeName} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge='end'
                                        onChange={() => history.push(`${match.path}/details/${value.id}`)}
                                        checked={false}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
                <ActionMenu path={match.path} refresh={reloadDataCallback} />
            </Paper>
            <Route path={`${match.path}/details/:id`} exact component={React.lazy(() => import('./recipe.details'))} />
            <Route path={`${match.path}/add`} exact component={React.lazy(() => import('./recipe.add'))} />
        </div>
    );
}

export default ensureIsAuthorized(ensureApiData(RecipesComponent));
