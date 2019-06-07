import * as React from "react";
import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';

@ensureTranslationsDecorator('shared')
export default class HomeComponent extends React.Component<ITranslationsProps> {
    public render() {
        if (!this.props.translate) {
            return null;
        }
        return (
            <div>
                {this.props.translate('home')}
            </div>
        );
    }
}