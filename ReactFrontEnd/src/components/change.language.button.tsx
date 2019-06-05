import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { WithTranslation } from 'react-i18next';
import { ensureTranslationsDecorator, ITranslationsProps } from '@bx-utils/decorators/translateDecorator';

interface IChangeLanguageState {
    isOpen: boolean;
}

interface IChangeLanguageProps extends ITranslationsProps {
    name: string;
}

@ensureTranslationsDecorator<IChangeLanguageProps>('shared')
export default class ChangeLanguageComponent extends React.Component<IChangeLanguageProps, IChangeLanguageState> {
    private translate(key: string): string {
        if (this.props.translate === undefined) {
            return key;
        }

        return this.props.translate(key);
    }

    public componentWillMount() {
        this.setState({
            isOpen: false
        });
    }
    public render(): JSX.Element {
        return (
            <div>
                <Button
                    onClick={() => {
                        if (this.props.changeLanguage !== undefined) {
                            this.props.changeLanguage('pl')
                        }
                    }}
                >
                    {this.translate("Change language")} {this.props.currentLanguage}
                </Button>
            </div>
        );
    }
}
