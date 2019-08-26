import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Loading from './loading.indicator';
import styledcomponent from 'styled-components';

interface IAsyncButtonProps extends ButtonProps {
    loading?: boolean;
}

const useStyles = makeStyles(theme => ({
    wrapper: {
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

export default function AsyncButton({ loading, children, className, ...props }: IAsyncButtonProps): JSX.Element {
    const [isLoading, loadingChange] = React.useState(loading);
    const classes = useStyles();

    const buttonProps = {
        ...props,
        className: `${classes.wrapper} ${className}`,
        disabled: props.disabled === undefined ? isLoading || loading : (props.disabled || isLoading),
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
    return (
        <Button {...buttonProps} >
            {
                isLoading || loading
                    ? <Loading size={24} className={classes.buttonProgress} />
                    : null
            }
            {children}
        </Button>
    );
}
