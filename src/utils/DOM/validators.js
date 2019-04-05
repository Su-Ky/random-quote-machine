export const required: Function = (val) => val && val.length;
export const length: Function = (n) => (val) => val.length > n;
export const validEmail: Function = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
export const VALID_EMAIL: string = 'El format del correu no és vàlid.';
export const validPasswd: Function = (val) => /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(val);
