export class Tasks {
 
    id: number;
    title: string;
 
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
 
}