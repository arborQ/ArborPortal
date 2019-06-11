import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { BrowserRouter as Router, Route, Link, NavLink, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { ensureApiDataDecorator } from '@bx-utils/decorators/ensureApiDataDecorator';

interface IRecipeListProps extends RouteComponentProps {
    data: {
        items: Areas.Recipes.IRecipe[];
        totalCount: number;
    }
}

function ActionMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    return (
        <div>
            <Button
                onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
            >
                Actions
            </Button>
            <Divider />
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem selected={false} onClick={() => setAnchorEl(null)}>
                    Add new recipe
                </MenuItem>
                <MenuItem selected={false} onClick={() => setAnchorEl(null)}>
                    Add new recipe 2
                </MenuItem>
            </Menu>
        </div>
    );
}

const EnsureRecepiesAreLoaded = ensureApiDataDecorator({ url: '/recipes/recipe' })(
    function ({ match, history, data }: IRecipeListProps) {
        console.log(data);
        return (
            <div>
                <Paper>
                    <ActionMenu />
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
                                            edge="end"
                                            onChange={() => history.push(`${match.path}/details/${value.id}`)}
                                            checked={false}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
                <Route path={`${match.path}/details`} exact component={React.lazy(() => import("./recipe.details"))} />
            </div>
        );
    });

export default EnsureRecepiesAreLoaded;