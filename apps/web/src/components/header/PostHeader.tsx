import { truncate } from '@/src/utils/truncate'
import { PostType } from '@/src/types/message'

type PostHeaderProps = {
  post: PostType
  hasAnswer: string | boolean | null
}

const PostHeader = ({ post, hasAnswer }: PostHeaderProps) => {
  return (
    <div>
      <h1 className="mb-4 font-semibold text-3xl">{post.title}</h1>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {hasAnswer ? (
            <div className="px-2.5 py-1 border border-green-400 text-green-400 rounded-full opacity-60">
              Answered
            </div>
          ) : (
            <div className="px-2.5 py-1 border rounded-full opacity-50">
              Unanswered
            </div>
          )}
          <div className="opacity-90">
            {truncate(post.username, 32)} posted this in{' '}
            <span className="opacity-80 font-semibold">
              #{post.channelName}
            </span>
          </div>
        </div>

        <a
          href={`https://discord.com/channels/752553802359505017/${post.snowflakeId}/${post.snowflakeId}`}
          className="shrink-0 w-fit px-4 py-1.5 font-semibold text-white border-neutral-700 border rounded hover:bg-neutral-700 hover:no-underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Discord
        </a>
      </div>
    </div>
  )
}

export default PostHeader
