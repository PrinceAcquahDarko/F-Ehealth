export class User {
    
    constructor(
        public _id: string,
        public firstname : String,
        public lastname: String,
        public email : string,
        public password: string,
        public confirmPassword: string,
    ){} 

    static CreateDefault(): User {
        return new User('', '', 0, '', '');
    }
}