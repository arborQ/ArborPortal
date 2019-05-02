import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactApplication from "./application";
import { BrowserRouter as Router} from "react-router-dom";

function Render(props: { text: string }): JSX.Element {
    const [name, updateName] = React.useState(props.text);
    const [lazyComponent, loadComponent] = React.useState<JSX.Element>(<div>not loaded</div>);

    return (
        <div>
            <button onClick={() => {
                const NewComponent = React.lazy(() => import(/* webpackChunkName: "my-lazy" */"./lazyComponent"))
                loadComponent(<NewComponent />);
            }}>Load</button>
            <input type="text" value={name} onChange={e => updateName(e.currentTarget.value)} />
            <React.Suspense fallback={() => <div>Loading ...</div>}>
                {lazyComponent}
            </React.Suspense>
            </div>
    );
}

// ReactDOM.render(<Router><ReactApplication /></Router>, document.getElementById("container"));
ReactDOM.render(<div><Render text="default"></Render></div>, document.getElementById("container"));