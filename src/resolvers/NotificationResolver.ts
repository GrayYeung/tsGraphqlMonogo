import {
  Arg,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Notification, NotificationPayload } from "../model/Notification";

@Resolver(() => Notification)
export class NotificationResolver {
  @Subscription({ topics: "NOTIFICATIONS" })
  normalSubscription(
    @Root() { id, message }: NotificationPayload
  ): Notification {
    return { id, message, date: new Date() };
  }

  private autoIncrement = 0;

  @Mutation(() => Boolean)
  async publisherMutation(
    @PubSub("NOTIFICATIONS") publish: Publisher<NotificationPayload>,
    @Arg("message", { nullable: true }) message?: string
  ): Promise<boolean> {
    await publish({ id: ++this.autoIncrement, message });
    return true;
  }
}
