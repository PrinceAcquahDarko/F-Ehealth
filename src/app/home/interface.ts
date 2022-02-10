export interface Iregister{
    firstname: string,
    lastname: string,
    email:string,
    password:string,
    confirmPasswrod?:string,
    status?:string,
    pic?:string
}


export interface Ilogin{
    email:string,
    password: string
}