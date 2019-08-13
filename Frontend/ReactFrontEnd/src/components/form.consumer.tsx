import * as React from 'react';

interface IInnerFormProps {
    children: (props: { isLoading: boolean }) => JSX.Element;
    disabled?: boolean;
    onSubmit: () => Promise<void>;
}

export default function FormComponent(props: IInnerFormProps) {
    const { children, onSubmit, disabled } = props;
    const [isLoading, changeLoading] = React.useState(!!disabled);

    return (
        <form className='context-form' onSubmit={async (e) => {
            e.preventDefault();
            if (!isLoading) {
                changeLoading(true);
                await onSubmit();
                changeLoading(false);
            }
        }}>
            {children({ isLoading })}
        </form>
    );
}