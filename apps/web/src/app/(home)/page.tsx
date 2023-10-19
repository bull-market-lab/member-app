import { PostsList } from '@/src/components/posts-list'

export const dynamic = 'error'
export const revalidate = 60

const Home = async () => {
  return <PostsList page={1} />
}

export default Home
