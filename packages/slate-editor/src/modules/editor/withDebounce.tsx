import type { ComponentType, FunctionComponent } from 'react';
import React, { Component } from 'react';

import { debounce } from '#lodash';

import { serialize } from './lib';
import type { EditorProps } from './types';

interface Props extends EditorProps {
    editorComponent: ComponentType<EditorProps>;
}

interface State {
    localValue: Props['value'];
}

const NOTIFY_ON_CHANGE_DELAY = 400;

class DebouncedEditor extends Component<Props, State> {
    // Cache previously reported external string value.
    // Needed to easily detect if `value` property change has originated from an external update
    // or an internal update reported with onChange() callback.
    localValueString = serialize(this.props.value);

    state = {
        localValue: this.props.value,
    };

    componentDidMount() {
        this.notifyOnChange();
    }

    componentDidUpdate(prevProps: Props) {
        const { value } = this.props;
        const serializedValue = serialize(value);

        const isModifiedFromOutside =
            value !== prevProps.value &&
            serializedValue !== serialize(prevProps.value) &&
            serializedValue !== this.localValueString &&
            serializedValue !== serialize(this.state.localValue);

        if (isModifiedFromOutside) {
            this.localValueString = serializedValue;
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ localValue: value });
        }
    }

    handleEditorChange = (value: Props['value']) => {
        this.setState({ localValue: value }, this.notifyOnChange);
    };

    // eslint-disable-next-line react/sort-comp
    notifyOnChange = debounce(() => {
        const { onChange, value } = this.props;
        const { localValue } = this.state;
        const updatedEditorValueString = serialize(localValue);
        // Notify outer world on meaningful changes only
        if (updatedEditorValueString !== serialize(value)) {
            this.localValueString = updatedEditorValueString;
            onChange(localValue);
        }
    }, NOTIFY_ON_CHANGE_DELAY);

    render() {
        const { editorComponent: EditorComponent, ...props } = this.props;

        return (
            <EditorComponent
                {...props}
                onChange={this.handleEditorChange}
                value={this.state.localValue}
            />
        );
    }
}

export function withDebounce(EditorComponent: ComponentType<EditorProps>) {
    const WithDebounce: FunctionComponent<EditorProps> = (props: EditorProps) => (
        <DebouncedEditor editorComponent={EditorComponent} {...props} />
    );

    const displayName = EditorComponent.displayName || EditorComponent.name;
    WithDebounce.displayName = `withDebounce(${displayName})`;

    return WithDebounce;
}
