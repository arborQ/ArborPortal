import { Box, Chip, Avatar, makeStyles, Theme, createStyles } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import * as React from 'react';

const useChipStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'start',
            flexWrap: 'wrap',
            marginLeft: -theme.spacing(1),
            marginRight: -theme.spacing(1),
        },
        chip: {
            margin: theme.spacing(1),
        },
        avatar: {
            width: '2.5em',
            height: '2.5em',
        }
    }),
);

interface IRecipeProductsComponentProps {
    products: string[];
}

export default function RecipeProductsComponent({ products }: IRecipeProductsComponentProps) {
    const chipClasses = useChipStyles();

    return (
        <Box className={chipClasses.root}>
            {
                products.map(p => (
                    <Chip
                        color='primary'
                        size='small'
                        label={p}
                        clickable
                        className={chipClasses.chip}
                        onDelete={() => { }}
                        avatar={(
                            <Avatar className={chipClasses.avatar}>
                                <FastfoodIcon />
                            </Avatar>
                        )} />
                ))
            }
        </Box>
    );
}
