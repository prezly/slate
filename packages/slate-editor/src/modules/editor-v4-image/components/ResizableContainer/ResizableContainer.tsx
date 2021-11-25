import classNames from 'classnames';
import { clamp, noop } from 'lodash';
import type { CSSProperties } from 'react';
import * as React from 'react';
import { Component } from 'react';
import type { DraggableEventHandler } from 'react-draggable';
import { DraggableCore } from 'react-draggable';

import { getClampedRatioInPercent, getClampedWidthInPercent, increaseWidth } from './lib';
import './ResizableContainer.scss';

interface Props {
    className?: string;
    enabled: boolean;
    maxWidth: number;
    minWidth: number;
    onResize: (widthPercent: string, widthFactor: string) => void;
    onResizeStop?: () => void;
    resizingClassName?: string;
    style?: CSSProperties | null;
    width: number;
    widthFactor: string;
    widthPercent: string;
}

interface State {
    isResizing: boolean;
    width: number;
    widthPercent: string;
}

class ResizableContainer extends Component<Props, State> {
    static defaultProps = {
        minWidth: 100,
        onResizeStop: noop,
        style: null,
    };

    state: State;

    constructor(props: Props) {
        super(props);

        const minimumWidthPercent = getClampedRatioInPercent(props.minWidth, props.maxWidth);
        const maximumWidthPercent = getClampedRatioInPercent(props.width, props.maxWidth);
        const currentWidthPercent = parseInt(props.widthPercent, 10);
        const widthPercent = clamp(currentWidthPercent, minimumWidthPercent, maximumWidthPercent);

        // eslint-disable-next-line react/state-in-constructor
        this.state = {
            isResizing: false,
            width: (props.maxWidth * currentWidthPercent) / 100,
            widthPercent: `${widthPercent}%`,
        };
    }

    componentDidMount() {
        this.props.onResize(this.state.widthPercent, this.props.widthFactor);
    }

    getMaximumWidth = () => Math.min(this.props.width, this.props.maxWidth);

    getMaximumWidthInPercent = () =>
        getClampedRatioInPercent(this.props.width, this.props.maxWidth);

    handleResizeStart = () => {
        this.setState({ isResizing: true });
    };

    handleResizeStop = () => {
        this.setState({ isResizing: false });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.props.onResizeStop!();
    };

    handleResize: DraggableEventHandler = (_event, { deltaX }) => {
        this.setState(
            ({ width }, { maxWidth, minWidth }) => {
                const nextWidth = increaseWidth(width, deltaX, minWidth, this.getMaximumWidth());
                const nextWidthPercent = getClampedWidthInPercent(
                    nextWidth,
                    maxWidth,
                    this.getMaximumWidthInPercent(),
                ).toFixed(2);

                return {
                    width: nextWidth,
                    widthPercent: `${nextWidthPercent}%`,
                };
            },
            () => {
                if (this.state.widthPercent !== this.props.widthPercent) {
                    this.props.onResize(this.state.widthPercent, this.props.widthFactor);
                }
            },
        );
    };

    render() {
        const { children, className, enabled, resizingClassName, style } = this.props;
        const { isResizing, widthPercent } = this.state;

        return (
            <div
                className={classNames(
                    'editor-v4-image-resizable-container',
                    className,
                    isResizing && resizingClassName,
                    {
                        'editor-v4-image-resizable-container--resizing': isResizing,
                    },
                )}
                contentEditable={false}
                style={{
                    width: widthPercent,
                    ...style,
                }}
            >
                {children}

                {enabled && (
                    <DraggableCore
                        onDrag={this.handleResize}
                        onStart={this.handleResizeStart}
                        onStop={this.handleResizeStop}
                    >
                        <div className="editor-v4-image-resizable-container__handle">
                            <button
                                className="editor-v4-image-resizable-container__button"
                                onMouseDown={(event) => event.preventDefault()}
                                type="button"
                            >
                                <i className="icon icon-arrow-resize6" />
                            </button>
                        </div>
                    </DraggableCore>
                )}
            </div>
        );
    }
}

export default ResizableContainer;
