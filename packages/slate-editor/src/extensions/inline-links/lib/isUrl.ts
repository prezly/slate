import validator from 'validator';

export function isUrl(value: string): boolean {
    /**
     * @see https://github.com/validatorjs/validator.js#validators
     */
    return validator.isURL(value, {
        require_protocol: true,
        require_valid_protocol: true,
    });
}
