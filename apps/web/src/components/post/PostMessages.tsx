import { MessageGroup } from "@/src/components/message/MessageGroup";
import { Message } from "@/src/components/message/Message";
import {
  GroupedMessages,
  MessageType,
  PostMessageType,
  PostType,
} from "@/src/types/message";

type PostMessagesProps = {
  post: PostType;
  postMessage: PostMessageType | undefined;
  groupedMessages: GroupedMessages<MessageType>;
};

const PostMessages = ({
  post,
  postMessage,
  groupedMessages,
}: PostMessagesProps) => {
  return groupedMessages.map((group) => (
    <MessageGroup
      key={group.id}
      isAnswer={group.messages.some((m) => m.snowflakeId === post.answerId)}
    >
      {group.messages.map((message, i) => (
        <Message
          key={message.id.toString()}
          snowflakeId={message.snowflakeId}
          createdAt={message.createdAt}
          content={message.content}
          isFirstRow={i === 0}
          author={{
            username: message.authorUsername,
            avatarUrl: message.authorAvatarUrl,
            isPublic: message.userIsPublic == 1,
            isOP: postMessage
              ? message.authorId === postMessage.authorId
              : false,
            isModerator: message.userIsModerator == 1,
          }}
          attachments={message.attachments}
        />
      ))}
    </MessageGroup>
  ));
};

export default PostMessages;
