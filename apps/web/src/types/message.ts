import { Attachment } from "@/src/components/message/MessageContent";

export interface PostType {
  username: string;
  snowflakeId: string;
  createdAt: Date;
  title: string;
  answerId: string | null;
  id: string;
  userIsPublic: number;
  userAvatar: string;
  channelName: string;
  messagesCount: number | null;
}

export interface PostMessageType {
  content: string;
  createdAt: Date;
  id: string;
  authorId: string;
  authorAvatarUrl: string;
  authorUsername: string;
  userIsPublic: number;
  userIsModerator: number;
  attachments: Attachment[];
}

export interface MessageType {
  snowflakeId: string;
  createdAt: Date;
  content: string;
  id: string;
  userIsPublic: number;
  authorId: string;
  authorAvatarUrl: string;
  authorUsername: string;
  userIsModerator: number;
  attachments: Attachment[];
}

export interface RequiredMessageFields {
  id: string;
  snowflakeId: string;
  authorId: string;
  createdAt: Date;
}

export type GroupedMessages<T> = Array<{
  id: string;
  messages: T[];
}>;
