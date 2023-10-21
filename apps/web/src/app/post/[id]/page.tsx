import '../../discord-markdown.css'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import plur from 'plur'
import { LayoutWithSidebar } from '@/src/components/sidebar/LayoutWithSidebar'
import { groupMessagesByUser } from '@/src/utils/groupMessages'
import { truncate } from '@/src/utils/truncate'
import { getCanonicalPostUrl } from '@/src/utils/urls'
import type { QAPage, WithContext } from 'schema-dts'
import { parseDiscordMessage } from '@/src/utils/discordMarkdown'
import getMessages from '@/src/apis/getMessages'
import getPost from '@/src/apis/getPost'
import getPostMessage from '@/src/apis/getPostMessage'
import PostHeader from '@/src/components/header/PostHeader'
import AnsweredMessage from '@/src/components/message/AnsweredMessage'
import PostMessage from '@/src/components/post/PostMessage'
import { MessageType, PostMessageType, PostType } from '@/src/types/message'
import PostMessages from '@/src/components/post/PostMessages'

// Since we have a lot of messages in a short period for posts, we will only revalidate it
// at most once every 60 seconds
export const dynamic = 'error'
export const revalidate = 60

// Next.js built-in function to generate metadata for the page for SEO
export const generateMetadata = async ({
  params,
}: PostProps): Promise<Metadata> => {
  const post = await getPost(params.id)
  const postMessage = await getPostMessage(params.id)

  const title = post?.title
  const postMessageFormatted = await parseDiscordMessage(
    postMessage?.content || '',
    true,
  )
  const description = truncate(postMessageFormatted, 230)
  const url = getCanonicalPostUrl(params.id)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Next.js Discord Forum',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

type PostProps = {
  params: { id: string }
}

const Post = async ({ params }: PostProps) => {
  const post: PostType | undefined = await getPost(params.id)
  if (!post) {
    notFound()
  }
  const messages: MessageType[] = await getMessages(params.id)
  const postMessage: PostMessageType | undefined = await getPostMessage(
    params.id,
  )

  const answerMessage = messages.find((m) => m.snowflakeId === post.answerId)
  const groupedMessages = groupMessagesByUser(messages, post.answerId)
  const hasAnswer =
    post.answerId && messages.some((m) => m.snowflakeId === post.answerId)

  const jsonLd: WithContext<QAPage> = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: post.title,
      text: postMessage
        ? await parseDiscordMessage(postMessage?.content, true)
        : 'Original message was deleted.',
      dateCreated: post.createdAt.toJSON(),
      answerCount: messages.length,
      author: {
        '@type': 'Person',
        name: post.username,
      },
      acceptedAnswer:
        hasAnswer && answerMessage
          ? {
              '@type': 'Answer',
              text: await parseDiscordMessage(answerMessage.content, true),
              url: `${getCanonicalPostUrl(params.id)}#message-${
                answerMessage.snowflakeId
              }`,
              dateCreated: answerMessage.createdAt.toJSON(),
              author: {
                '@type': 'Person',
                name: answerMessage.authorUsername,
              },
              upvoteCount: 1,
            }
          : undefined,
      suggestedAnswer:
        !hasAnswer && messages[0]
          ? {
              '@type': 'Answer',
              text: await parseDiscordMessage(messages[0].content, true),
              url: `${getCanonicalPostUrl(params.id)}#message-${
                messages[0].snowflakeId
              }`,
              dateCreated: messages[0].createdAt.toJSON(),
              author: {
                '@type': 'Person',
                name: messages[0].authorUsername,
              },
            }
          : undefined,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LayoutWithSidebar className="mt-4">
        <PostHeader post={post} hasAnswer={hasAnswer} />
        <div className="mt-4 space-y-1">
          <PostMessage postMessage={postMessage} />
          <AnsweredMessage answerMessage={answerMessage} />
        </div>
        <h2 className="my-4 text-lg font-semibold">
          {messages.length} {plur('Reply', messages.length)}
        </h2>
        <div className="space-y-2">
          <PostMessages
            post={post}
            postMessage={postMessage}
            groupedMessages={groupedMessages}
          />
        </div>
      </LayoutWithSidebar>
    </>
  )
}

export default Post
