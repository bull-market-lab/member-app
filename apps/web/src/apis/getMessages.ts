import { db, selectUuid, sql } from '@member-protocol/db/node'
import { Attachment } from '@/src/components/message/MessageContent'

const getMessages = async (postId: string) => {
  return await db
    .selectFrom('messages')
    .leftJoin('attachments', 'attachments.messageId', 'messages.snowflakeId')
    .innerJoin('users', 'users.snowflakeId', 'messages.userId')
    .select([
      selectUuid('messages.id').as('id'),
      'messages.snowflakeId',
      'messages.content',
      'messages.createdAt',
      selectUuid('users.id').as('authorId'),
      'users.avatarUrl as authorAvatarUrl',
      'users.username as authorUsername',
      'users.isPublic as userIsPublic',
      'users.isModerator as userIsModerator',
      sql<Attachment[]>`
        if(
          count(attachments.id) > 0,
          json_arrayagg(
            json_object(
              'id', ${selectUuid('attachments.id')},
              'url', attachments.url,
              'name', attachments.name,
              'contentType', attachments.contentType
            )
          ),
          json_array()
        )
      `.as('attachments'),
    ])
    .where('postId', '=', postId)
    .where('messages.snowflakeId', '!=', postId)
    .groupBy('messages.id')
    .orderBy('messages.createdAt', 'asc')
    .execute()
}

export default getMessages
