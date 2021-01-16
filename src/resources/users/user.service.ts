import { LoginInputDto, User } from "./user.types";
import { v5 as uuidv5 } from "uuid";
import argon2 from "argon2";

const NAMESPACE = "2339d050-5725-11eb-a703-b38c8895e8ae";
class Users {
  /* TODO: the hardcoded password wont work, you need
   * to change it via API call once the server is up and running.
   * Or create a new user with the Api and use that one instead. */
  private users: User[] = [
    {
      id: uuidv5("john@doe.com", NAMESPACE),
      name: "John Doe",
      email: "john@doe.com",
      password: "This password wont work",
    },
    {
      id: uuidv5("jane@doe.com", NAMESPACE),
      name: "Jane Doe",
      email: "Jane@doe.com",
      password: "This password wont work",
    },
  ];

  public readonly find = (id: string) =>
    this.users.find((usr) => usr.id === id);

  public readonly findByEmail = (email: string) =>
    this.users.find((usr) => usr.email === email);

  /**
   * @description Lists all the users registered in the database
   */
  public readonly findAll = () => this.users;

  /**
   * @description checks if the email is already registered, and creates a new user
   */
  public readonly create = async (user: Omit<User, "id">) => {
    const newUser = {
      id: uuidv5(user.email, NAMESPACE),
      ...user,
      password: await argon2.hash(user.password),
    };
    if (this.findByEmail(newUser.email) || this.find(newUser.id))
      throw Error("Email already registered");
    this.users.push(newUser);
    const { password, ...toReturn } = newUser;
    return toReturn;
  };

  /**
   * @description Takes the login info, and validates against the db
   */
  public readonly login = async ({ email, password }: LoginInputDto) => {
    const user = this.users.find((usr) => usr.email === email);
    if (!user) return false;
    if (!this.verify(user, password)) return false;
    return user.id;
  };

  /**
   * @description validates the supplied password, against the stored password from db
   * @param user The found user object
   * @param password The plain-text password that we want to check
   */
  private verify = (user: User, password: string) =>
    argon2.verify(user.password, password);
}
export const UsersService = new Users();
