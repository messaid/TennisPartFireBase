import { RankingEnum } from './../enums/ranking-enum';
export class UserDTO {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    ranking?: RankingEnum;
    postalCode?: string;
    photoURL?: string;
    providerId?: string;
}