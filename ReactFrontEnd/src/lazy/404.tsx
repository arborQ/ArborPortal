import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function(): JSX.Element {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Page does not exists.
                </Typography>
            </CardContent>
            <CardActions>
                <Button  variant="contained" color="primary" size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
