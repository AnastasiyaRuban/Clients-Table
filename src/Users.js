class User {
  static id = 0;
  getId() {
    return ++User.id;
  }

  constructor(name, contacts) {
    this.id = this.getId();
    this.name = name;
    this.dateCreate = new Date();
    this.dateEdit = new Date();
    this.contacts = contacts;
  }
}

const users = [
  new User('Иванов Иван Иванович', {
    phone: '123',
    email: 'dfdf',
  }),
  new User('Петров Петр Петрович', {
    phone: '123',
    email: 'dfdf',
  }),
];
