import { Reaction } from "./reaction";
import { Tweet } from "./tweet";
import { User } from "./user";

export class Like extends Reaction {
  constructor(from: User, tweet: Tweet) {
    super(from, tweet);
  }

  public showReaction(): void {
    console.log(
      `\n${this.from.username} curtiu o tweet de ${this.tweet.user.username}.\n`
    );
  }
}