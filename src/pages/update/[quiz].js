import QuizEditor from '@/components/QuizEditor';
import Layout from '@/components/Layout';

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
    const res = await fetch('http://localhost:3000/api/Quiz', {
    method: 'GET'
    })
    const quizes = await res.json()
    const paths = quizes.map((quiz)=>{return {params: {quiz: quiz._id}}})

    return {
      paths,
      fallback: false, // can also be true or 'blocking'
    }
  }
  
  // `getStaticPaths` requires using `getStaticProps`
  export async function getStaticProps(context) {
    const res = await fetch(`http://localhost:3000/api/Quiz?id=${context.params.quiz}`, {
        method: 'GET'
      })
      const quiz = await res.json()
      // By returning { props: { posts } }, the Blog component
      // will receive `posts` as a prop at build time
      return {
        props: {
        quiz,
        },
      }
  }

const Post = ({ quiz }) => {
  return (
    <Layout page="update">
      <QuizEditor mode="edit" quiz={quiz}/>
    </Layout>
  )
}

export default Post