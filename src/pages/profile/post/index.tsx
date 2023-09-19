import { PostModal } from '@/features/post/ui/PostModal/PostModal'
import { settingLayout } from '@/shared/layouts/ProfileLayout/SettingLayout'

function Post() {
  return <PostModal />
}

Post.getLayout = settingLayout
export default Post
