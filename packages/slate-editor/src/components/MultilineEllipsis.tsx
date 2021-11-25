import * as React from 'react';
import { Component, createRef, memo } from 'react';
import shave from 'shave';

interface Props {
    children: string;
    maxHeight: number;
    className?: string;
}

class MultilineEllipsis extends Component<Props> {
    static defaultProps = {
        className: '',
    };

    containerRef = createRef<HTMLSpanElement>();

    componentDidMount() {
        this.applyMultilineEllipsis();
        // Re-apply ellipsis after fonts are loaded.
        window.addEventListener('load', this.applyMultilineEllipsis);
        window.addEventListener('resize', this.applyMultilineEllipsis);
    }

    componentDidUpdate() {
        this.applyMultilineEllipsis();
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.applyMultilineEllipsis);
        window.removeEventListener('resize', this.applyMultilineEllipsis);
    }

    applyMultilineEllipsis = () => {
        const { maxHeight } = this.props;

        // Ref is always available in componentDidMount or after,
        // cast the type to make TypeScript happy.
        shave(this.containerRef.current as HTMLSpanElement, maxHeight);
    };

    render() {
        const { children: text, className } = this.props;

        return (
            <span className={className} ref={this.containerRef} title={text}>
                {text}
            </span>
        );
    }
}

export default memo(MultilineEllipsis);
