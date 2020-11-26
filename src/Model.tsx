export class Event implements IObjectKeys {
  [key: string]: any;
  id?: number;
  title?: string;
  allDay!: boolean;
  start?: Date;
  end?: Date;
  resource?: string;
  name?: string;
}

interface IObjectKeys {
  [key: string]: any;
}
