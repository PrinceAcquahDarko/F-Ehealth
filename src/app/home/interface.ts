export interface Iregister{
    firstname: string,
    lastname: string,
    email:string,
    password:string,
    confirmPasswrod?:string,
}


export interface Ilogin{
    email:string,
    password: string
}