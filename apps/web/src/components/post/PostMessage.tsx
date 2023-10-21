import { MessageGroup } from "@/src/components/message/MessageGroup";
import { Message } from "@/src/components/message/Message";
import { PostMessageType } from "@/src/types/message";

type PostMessageProps = {
  postMessage: PostMessageType | undefined;
};

const PostMessage = ({ postMessage }: PostMessageProps) => {
  return (
    <MessageGroup isAnswer={false}>
      {postMessage ? (
        <Message
          snowflakeId={postMessage.id.toString()}
          createdAt={postMessage.createdAt}
          content={postMessage.content}
          author={{
            username: postMessage.authorUsername,
            avatarUrl: postMessage.authorAvatarUrl,
            isPublic: postMessage.userIsPublic == 1,
            isOP: true,
            isModerator: postMessage.userIsModerator == 1,
          }}
          attachments={postMessage.attachments}
          isFirstRow
        />
      ) : (
        <span className="px-4 opacity-80">Original message was deleted.</span>
      )}
    </MessageGroup>
  );
};

export default PostMessage;
