import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/NoteAddRounded';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));
export interface ISearchProps {
    search: string;
    helperText?: string;
    onSearch: (search: string) => Promise<void> | void;
    onType?: (search: string) => Promise<void> | void;
    onEscape?: (originalSearch: string) => void;
    actions?: Array<{
        tooltip: string;
        icon: React.ReactElement;
    } & IconButtonProps>;
}

export default function CustomizedInputBase(props: ISearchProps) {
    const classes = useStyles();
    const { helperText, onSearch, onType, onEscape, search, actions } = props;
    const [searchState, updateSearchText] = React.useState({
        searchText: search,
        isSearching: false
    });

    const triggerType = (searchText: string) => {
        updateSearchText({ ...searchState, searchText });
        if (onType !== undefined) {
            Promise.resolve(onType(searchText));
        }
    };
    const triggerSearch = () => {
        Promise.resolve(onSearch(searchState.searchText));
    };

    return (
        <form onSubmit={e => {
            e.preventDefault();
            triggerSearch();
        }}>
            <Paper className={classes.root}>
                {/* <IconButton className={classes.iconButton} aria-label='menu'>
                <MenuIcon />
            </IconButton> */}
                <InputBase
                    autoFocus={true}
                    autoCorrect={'off'}
                    autoComplete={'off'}
                    spellCheck={false}
                    value={searchState.searchText}
                    onChange={e => triggerType(e.target.value)}
                    onKeyDown={e => {
                        if (e.keyCode === 27 && onEscape !== undefined) {
                            onEscape(searchState.searchText);
                        }
                    }}
                    className={classes.input}
                    placeholder={helperText}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton onClick={() => { triggerSearch(); }} className={classes.iconButton} aria-label='search'>
                    <SearchIcon />
                </IconButton>
                {
                    actions === undefined
                        ? null
                        : actions.map((a, index) => {
                            const { tooltip, icon, ...iconProps } = a;

                            return (
                                <Tooltip title={tooltip} key={index}>
                                    <IconButton className={classes.iconButton} {...iconProps}>
                                        {icon}
                                    </IconButton>
                                </Tooltip>
                            );
                        })
                }
            </Paper>
        </form>
    );
}
