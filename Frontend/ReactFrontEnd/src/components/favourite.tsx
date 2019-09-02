import * as React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export interface IFavouriteProps {
    title?: string;
    storageKey: string;
}

export default function FavouriteComponent(props: IFavouriteProps) {
    const { title } = props;
    const { t } = useTranslation();

    const displayTitle = t(title || 'add to favourite');

    return (
        <Tooltip title={displayTitle}>
            <IconButton aria-label={displayTitle} disabled>
                <FavoriteIcon />
            </IconButton>
        </Tooltip>
    );
}
