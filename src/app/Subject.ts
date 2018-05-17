export class Subject {
 
    id: number;
    title: string;
    description: string;
    //Both the passwords are in a single object
    password: { 
      pwd: string;
      confirmPwd: string;
    };
    type: string;
    terms: boolean;
 
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
 
}