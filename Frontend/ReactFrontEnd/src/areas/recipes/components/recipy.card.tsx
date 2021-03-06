import * as React from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    IconButton,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Collapse,
    Theme,
    CardActionArea,
    Grid,
    Tooltip
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavouriteComponent from '../../../components/favourite';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function RecipyCardComponent(props: {
    name: string,
    description: string,
    id: string,
    onCookClick: () => void
}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    const { name, description, id, onCookClick } = props;

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => onCookClick()}>
                <CardHeader
                    avatar={
                        <Avatar aria-label='recipe'>
                            {name[0]}
                        </Avatar>
                    }
                    title={name}
                    subheader='September 14, 2016'
                />
                <CardMedia
                    className={classes.media}
                    image='https://material-ui.com/static/images/cards/paella.jpg'
                    title={name}
                />
                <CardContent>
                    <Tooltip title={description} enterDelay={600}>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {description.length > 100
                                ? `${description.substr(0, 100)}...`
                                : description}
                        </Typography>
                    </Tooltip>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container justify='space-between' alignItems='center'>
                    <FavouriteComponent title='add recipe favourite' storageKey={`recipe_fav_${id}`} />
                    <IconButton aria-label='share' disabled>
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label='cook' onClick={() => onCookClick()}>
                        <FastfoodIcon />
                    </IconButton>
                    <IconButton aria-label='settings'>
                        <MoreVertIcon />
                    </IconButton>
                </Grid>
            </CardActions>
        </Card>
    );
}
