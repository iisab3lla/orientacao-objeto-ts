import { User } from "./user";
import { Like } from "./like";
import { Dislike } from "./dislike";
import { BaseId } from "./base";

export type Type = "Normal" | "Reply";

export class Tweet extends BaseId {
  private _likes: Like[] = [];
  private _dislikes: Dislike[] = [];
  private _replies: Tweet[] = [];

  constructor(
    private _content: string,
    private _type: Type,
    private _user: User
  ) {
    super();
  }

  public get content(): string {
    return this._content;
  }

  public get type(): Type {
    return this._type;
  }

  public get user(): User {
    return this._user;
  }

  public addReaction(reaction: Like | Dislike): void {
    if (reaction instanceof Like) {
      this._likes.push(reaction);
    } else if (reaction instanceof Dislike) {
      this._dislikes.push(reaction);
    }
  }

  public reply(content: string, user: User): void {
    const replyTweet = new Tweet(content, "Reply", user);
    this._replies.push(replyTweet);
  }

  public show(): void {
    const likeCount = this._likes.length;
    const dislikeCount = this._dislikes.length;

    const likeText = likeCount === 0
      ? ""
      : likeCount === 1
        ? `@${this._likes[0].from.username} curtiu`
        : `@${this._likes[0].from.username} e mais ${likeCount - 1} usuários curtiram`;

    const dislikeText = dislikeCount === 0
      ? ""
      : dislikeCount === 1
        ? `@${this._dislikes[0].from.username} não gostou`
        : `@${this._dislikes[0].from.username} e mais ${dislikeCount - 1} usuários não gostaram`;

    console.log(
      `@${this._user.username}: ${this._content}\n${likeText}\n${dislikeText}`
    );

    this._replies.forEach((reply) => {
      reply.show();
    });
  }
}
