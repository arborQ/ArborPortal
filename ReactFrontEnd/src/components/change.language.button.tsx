import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { WithTranslation } from 'react-i18next';
import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';

interface IChangeLanguageState {
    isOpen: boolean;
}

interface IChangeLanguageProps extends ITranslationsProps{
    name: string;
}

// @ensureTranslationsDecorator<IChangeLanguageProps, IChangeLanguageState>('shared')
class ChangeLanguageComponent extends React.Component<IChangeLanguageProps, IChangeLanguageState> {
    public componentWillMount() {
        this.setState({
            isOpen: false
        });
    }
    public render(): JSX.Element {
        return (
            <div>
                <Button
                    onClick={() => { this.props.changeLanguage('pl') }}
                >
                    {this.props.translate("Change language")} {this.props.currentLanguage}
                </Button>
            </div>
        );
    }
}


export default ensureTranslationsDecorator<IChangeLanguageProps, IChangeLanguageState>('shared')(ChangeLanguageComponent);
// export default ChangeLanguageComponent;