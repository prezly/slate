export type DataTransferHandler = (
    dataTransfer: DataTransfer,
    next: (dataTransfer: DataTransfer) => void,
) => void;
