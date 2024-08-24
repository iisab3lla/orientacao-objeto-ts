import { Tweet } from "./tweet";
import { users } from "../databases/user";
import { tweets } from "../databases/tweet";
import { BaseId } from "./base";

export class User extends BaseId {
  private _followers: User[] = [];
  private _tweets: Tweet[] = [];

  constructor(
    private _name: string,
    private _username: string,
    private _email: string,
    private _password: string
  ) {
    super();
  }

  public get name(): string {
    return this._name;
  }

  public get username(): string {
    return this._username;
  }

  public get email(): string {
    return this._email;
  }

  public validatePassword(password: string): boolean {
    return password === this._password;
  }

  public get followers(): User[] {
    return this._followers;
  }

  public get tweets(): Tweet[] {
    return this._tweets;
  }

  public sendTweet(newTweet: Tweet): void {
    if (newTweet.user.username !== this._username) {
      throw new Error(
        "Não é possível adicionar ou enviar um tweet criado por outra pessoa"
      );
    }
    if (newTweet.type !== "Normal") {
      throw new Error("Tipo de resposta inválido. O tipo deve ser 'Normal'");
    }
    tweets.push(newTweet);
    this._tweets.push(newTweet);
  }

  public follow(userToFollow: User): void {
    if (userToFollow.username === this._username) {
      throw new Error("Não é possível seguir a si mesmo");
    }
    if (!this._followers.includes(userToFollow)) {
      this._followers.push(userToFollow);
    }
  }

  public showFollowers(): void {
    console.log(
      `SEGUIDORES DE: ${this._username.toUpperCase()}\n------------------------------------\n`
    );
    this._followers.forEach((follower) => {
      console.log(
        "Username: ",
        follower.username,
        "\n------------------------------------"
      );
    });
  }

  public showFeed(): void {
    this.showTweet();
  }

  private showTweet(): void {
    console.log(
      `________________________\n\n-- HISTÓRICO DE TWEETS DE: ${this._username.toUpperCase()}  -- \n________________________`
    );

    const tweetsUserLogged = tweets.filter(
      (tweet) => this.id === tweet.user.id
    );
    tweetsUserLogged.forEach((tweet) => {
      tweet.show();
    });

    const followedUserIds = this._followers.map((follower) => follower.id);

    const tweetsToShow = tweets.filter(
      (tweet) =>
        followedUserIds.includes(tweet.user.id) && tweet.user.id !== this.id
    );

    tweetsToShow.forEach((tweet) => {
      tweet.show();
    });
  }

  private checkUsername(): void {
    const existsUsername = users.some(
      (user) => user.username === this._username
    );

    if (existsUsername) {
      throw new Error("Este usuário já está cadastrado!");
    }
  }

  private checkEmail(): void {
    const existsEmail = users.some((user) => user.email === this._email);

    if (existsEmail) {
      throw new Error("Email já cadastrado!");
    }
  }

  public static createUser(
    name: string,
    username: string,
    email: string,
    password: string
  ): User {
    const newUser = new User(name, username, email, password);
    users.push(newUser);
    return newUser;
  }
}
