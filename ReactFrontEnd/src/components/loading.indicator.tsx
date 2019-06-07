import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function() {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() =>{
            setProgress((progress + 1) % 100);
        }, 20);

        return () => clearInterval(timer);
    });

    return (
        <CircularProgress variant="determinate" value={progress} />
    );
}