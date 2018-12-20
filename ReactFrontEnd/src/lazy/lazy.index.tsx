import * as React from "react";
import { useState, useEffect  } from "react";
import { update } from '../utils/ajax/index';

export default function renderHook(): JSX.Element {
    const [[c], update] = useState([{ count: 1, name: "name" }]);

    useEffect (() => {
        // document.title = `Count ${c[0].count} - ${c[0].name}`
    });

    return (
        <div>counter {c.count} <button onClick={() => {
update([ { count: c.count + 2, name: c.name }])

        } }>add 2</button></div>
    );
}