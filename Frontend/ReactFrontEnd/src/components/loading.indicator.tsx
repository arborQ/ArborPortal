import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

export default function (props: CircularProgressProps) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((progress + 1) % 100);
        }, 20);

        return () => clearInterval(timer);
    });

    return (
        <CircularProgress {...props} variant='determinate' value={progress} />
    );
}
