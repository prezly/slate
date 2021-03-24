import React, { FunctionComponent } from 'react';

interface Props {
    height: number;
    width: number;
}

const InfiniteLoadingIndicator: FunctionComponent<Props> = ({ height, width }) => (
    <svg height={height} viewBox="0 0 32 32" width={width} xmlns="http://www.w3.org/2000/svg">
        <path
            clipRule="evenodd"
            d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM26 16C26 21.5228 21.5228 26 16 26C10.4772 26 6 21.5228 6 16C6 10.4772 10.4772 6 16 6C21.5228 6 26 10.4772 26 16Z"
            fill="#B3E7C1"
            fillRule="evenodd"
        />
        <path
            className="loading-indicator-v2__infinite-progress"
            clipRule="evenodd"
            d="M23.1116 1.66337C22.6831 1.42752 22.1908 1.29333 21.6671 1.29333C20.0102 1.29333 18.6671 2.63648 18.6671 4.29334C18.6671 5.50949 19.3907 6.55662 20.4309 7.02763L20.4228 7.02874C23.7272 8.66095 25.9999 12.065 25.9999 15.9999C25.9999 19.9348 23.7272 23.3389 20.4229 24.9711L20.4311 24.9722C19.3908 25.4432 18.667 26.4904 18.667 27.7066C18.667 29.3635 20.0101 30.7066 21.667 30.7066C22.1912 30.7066 22.684 30.5722 23.1129 30.3359C28.3802 27.7174 31.9999 22.2814 31.9999 15.9999C31.9999 9.71799 28.3796 4.28162 23.1116 1.66337Z"
            fill="#02AB5C"
            fillRule="evenodd"
        />
    </svg>
);

export default InfiniteLoadingIndicator;
