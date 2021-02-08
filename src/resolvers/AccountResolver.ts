import {
  Arg,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from "type-graphql";
import { AccountModel } from "../entity/AccountEntity";
import { ObjectId } from "mongodb";
import { AccountNotice, AccountPayload } from "../model/Account";
import { Notification, NotificationPayload } from "../model/Notification";

@Resolver(() => AccountModel)
export class AccountResolver {
  @Mutation(() => Boolean)
  async createAccount(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    const model = new AccountModel({ username: username, password: password });
    await model.save();

    return true;
  }

  @Mutation(() => ID)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @PubSub("LOGINEVENT") publish: Publisher<AccountPayload>
  ): Promise<ObjectId> {
    const account = await AccountModel.findOne({ username: username }).lean();
    console.log(password);
    console.log(account);

    await publish({ _id: account!._id, username: account!.username });
    return account!._id;
  }

  @Subscription({ topics: "LOGINEVENT" })
  loginSubscription(@Root() { _id, username }: AccountPayload): AccountNotice {
    const msg = "someone has login";
    return { _id, username, message: msg };
  }

  @Subscription({
    topics: "LOGINEVENT",
    filter: ({ payload }: ResolverFilterData<AccountPayload>) =>
      payload._id.equals("6013b2dbeb60c549f8dd5c8b"),
  })
  loginSubscriptionWithFilter(
    @Root() { _id, username }: AccountPayload
  ): AccountNotice {
    const msg = "someone has login";
    return { _id, username, message: msg };
  }

  // @Subscription({ topics: "NOTIFICATIONS" })
  // normalSubscription(
  //   @Root() { id, message }: NotificationPayload
  // ): Notification {
  //   return { id, message, date: new Date() };
  // }
  //
  // private autoIncrement = 0;
  //
  // @Mutation(() => Boolean)
  // async publisherMutation(
  //   @PubSub("NOTIFICATIONS") publish: Publisher<NotificationPayload>,
  //   @Arg("message", { nullable: true }) message?: string
  // ): Promise<boolean> {
  //   await publish({ id: ++this.autoIncrement, message });
  //   return true;
  // }

  @Subscription(() => Notification, {
    topics: "NOTIFICATIONS",
    filter: ({ payload }: ResolverFilterData<NotificationPayload>) =>
      payload.id % 2 === 0,
  })
  subscriptionWithFilter(
    @Root() { id, message }: NotificationPayload
  ): Notification {
    const newNotification: Notification = { id, message, date: new Date() };
    console.log(newNotification);
    return newNotification;
  }
}
