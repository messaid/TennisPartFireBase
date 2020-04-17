export class ErrorMessages {
    public static EMAIL_INVALID(): string {
        return `Not a valid email`;
    }

    public static EMAIL_REQUIRED(): string {
        return `You must enter an email`;
    }

    public static PHONE_NUMBER_REQUIRED(): string {
        return `You must enter a phone number`;
    }

    public static ZIP_CODE_REQUIRED(): string {
        return `You must enter a zip code`;
    }

    public static PASSWORD_INVALID(): string {
        return `there is a missmatch between passwords`;
    }

    public static PRODUCT_MISSING_FIELD(fieldName: string): string {
        return `Please write the ` + fieldName + ' of your ad';
    }
}