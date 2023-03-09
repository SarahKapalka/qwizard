import QuizEditor from '@/components/QuizEditor';
import Layout from '@/components/Layout';


export default function Quiz() {
  return (
    <Layout page="make quiz">
      <QuizEditor mode="create"/>
    </Layout>
  )
}
