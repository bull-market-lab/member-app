import { MessageType } from "@/src/types/message";
import { MessageContent } from "@/src/components/message/MessageContent";
import { ArrowDownIcon } from "@/src/components/icons/ArrowDown";
import { CheckCircleSolidIcon } from "@/src/components/icons/CheckCircleSolid";

type AnsweredMessageProps = {
  answerMessage: MessageType | undefined;
};

const AnsweredMessage = ({ answerMessage }: AnsweredMessageProps) => {
  return (
    answerMessage && (
      <div className="p-2 sm:p-3 space-y-1.5 border border-green-400 rounded">
        <div className="flex space-x-2 items-center text-green-400">
          <CheckCircleSolidIcon />
          <div className="text-sm">
            Answered by{" "}
            <span className="font-semibold">
              {answerMessage.authorUsername}
            </span>
          </div>
        </div>

        <div
          className="max-h-32 overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(180deg, #000 80%, transparent)",
            maskImage: "linear-gradient(180deg, #000 80%, transparent)",
          }}
        >
          <MessageContent
            content={answerMessage.content}
            attachments={answerMessage.attachments}
          />
        </div>

        <a
          href={`#message-${answerMessage.snowflakeId}`}
          className="mt-2 opacity-80 font-semibold text-sm space-x-1"
        >
          <span>View full answer</span>
          <ArrowDownIcon size={4} />
        </a>
      </div>
    )
  );
};

export default AnsweredMessage;
