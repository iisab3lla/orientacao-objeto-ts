import { Tweet } from "./tweet";
import { User } from "./user";
import { BaseId } from "./base";

export abstract class Reaction extends BaseId {
  constructor(private readonly _from: User, private readonly _tweet: Tweet) {
    super(); // Chama o construtor da classe base
  }

  public get from(): User {
    return this._from;
  }

  public get tweet(): Tweet {
    return this._tweet;
  }

  public abstract showReaction(): void;
}

