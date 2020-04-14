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

    public static PASSWORD_INVALID(): string {
        return `Missmatch password`;
    }
}