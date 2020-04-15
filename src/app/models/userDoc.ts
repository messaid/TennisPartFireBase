import { UserDTO } from 'src/app/models/user';
export class UserDoc {
    doc: string;
    user: UserDTO;

    constructor() {
        this.user = new UserDTO();
    }
}
