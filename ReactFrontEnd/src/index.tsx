import * as React from "react";
import * as ReactDOM from "react-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';


function LoginAction() {

}

function Render(props: { text: string }): JSX.Element {
    const [name, updateName] = React.useState(props.text);
    const [lazyComponent, loadComponent] = React.useState<JSX.Element>(<div>not loaded</div>);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <div>
                <React.Suspense fallback={() => <div>Loading ...</div>}>
                    {lazyComponent}
                </React.Suspense>
            </div>
        </div>
    );
}

ReactDOM.render(<div><Render text="default"></Render></div>, document.getElementById("container"));