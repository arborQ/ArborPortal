import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Loading from './loading.indicator';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: '#FFF',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function (props: ButtonProps): JSX.Element {
    const [isLoading, loadingChange] = React.useState(false);
    const buttonProps = {
        ...props,
        disabled: props.disabled === undefined ? isLoading : (props.disabled || isLoading),
        onClick: async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (!!props.onClick) {
                try {
                    loadingChange(true);
                    await Promise.resolve(props.onClick(event));
                    loadingChange(false);
                } catch {
                    loadingChange(false);
                }
            }
        }
    };
    const classes = useStyles();
    return (
        <div className={`${classes.root} ${classes.wrapper}`}>
            <Button {...buttonProps}></Button>
            {!!isLoading && <Loading size={24} className={classes.buttonProgress} />}
        </div>
    );
}