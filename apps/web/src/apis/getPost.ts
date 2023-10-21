import { db, selectUuid } from "@member-protocol/db/node";

const getPost = async (snowflakeId: string) => {
  return await db
    .selectFrom("posts")
    .innerJoin("users", "users.snowflakeId", "posts.userId")
    .innerJoin("channels", "channels.snowflakeId", "posts.channelId")
    .select([
      selectUuid("posts.id").as("id"),
      "posts.snowflakeId",
      "posts.title",
      "posts.createdAt",
      "posts.answerId",
      "users.username",
      "users.isPublic as userIsPublic",
      "users.avatarUrl as userAvatar",
      "channels.name as channelName",
      (eb) =>
        eb
          .selectFrom("messages")
          .select(eb.fn.countAll<number>().as("count"))
          .where("messages.postId", "=", eb.ref("posts.snowflakeId"))
          .as("messagesCount"),
    ])
    .where("posts.snowflakeId", "=", snowflakeId)
    .executeTakeFirst();
};

export default getPost;
