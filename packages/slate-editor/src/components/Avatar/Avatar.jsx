import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { emptyNewsroomIcon } from 'icons';

import SvgIcon from '../SvgIcon';

const SIZES = {
    tiny: 16,
    smaller: 24,
    small: 32,
    40: 40,
    normal: 48,
    large: 64,
};

const Avatar = ({ size, className, name, src, square }) => {
    const computedSize = SIZES[size] || size;
    const classnames = classNames(className, `avatar-thumb-${computedSize}`, {
        'img-circle': !square,
        rounded: square,
    });
    return src ? (
        <img
            alt={name}
            className={classnames}
            src={src}
            style={{
                minWidth: computedSize,
                width: computedSize,
                minHeight: computedSize,
                height: computedSize,
            }}
            title={name}
        />
    ) : (
        <SvgIcon
            className={classnames}
            height={SIZES[size]}
            icon={emptyNewsroomIcon}
            role="presentation"
            title={name}
            width={SIZES[size]}
        />
    );
};

Avatar.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(['tiny', 'small', 'smaller', 'normal', 'large', '40']),
    square: PropTypes.bool,
    src: PropTypes.string,
};

Avatar.defaultProps = {
    name: '',
    size: 'normal',
    src: '',
    square: false,
    className: '',
};

export default Avatar;
