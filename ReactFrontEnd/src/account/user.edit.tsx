import * as React from "react";
import { ensureIsAuthorized } from '@bx-utils/decorators/ensureIsAuthorized';

@ensureIsAuthorized()
export default class UserEditComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <form action="https://testweb.tools.no/login/Punchout" method="GET">
                <input type="text" name="username" value="punchout@statkraft.no" />
                <input type="text" name="password" value="H48862" />
                <input type="hidden" name="function" value="DOWNLOADJSON" />
                <input type="hidden" name="pagesize" value="100" />
                <input type="hidden" name="requestedPage" value="0" />
                <input type="submit" value="Send"/>
            </form>
        );
    }
}
