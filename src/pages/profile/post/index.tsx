import { PostModal } from '@/features/post/ui/postModal/PostModal'
import { settingLayout } from '@/shared/layouts/profileLayout/SettingLayout'

function Post() {
  return <PostModal />
}

Post.getLayout = settingLayout
export default Post
