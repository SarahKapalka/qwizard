import QuizEditor from '@/components/QuizEditor';
import Layout from '@/components/Layout';

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  let paths;
  const res = await fetch('https://qwizard-ten.vercel.app/api/Quiz', {
  method: 'GET'
  }).then(response => response.json()).then(quizes => paths = quizes.map((quiz)=>{return {params: {quiz: quiz._id}}}))

    return {
      paths,
      fallback: false, // can also be true or 'blocking'
    }
  }
  
  // `getStaticPaths` requires using `getStaticProps`
  export async function getStaticProps(context) {
    let quiz;
    const res = await fetch(`https://qwizard-ten.vercel.app/api/Quiz?id=${context.params.quiz}`, {
        method: 'GET'
      }).then(response => response.json()).then(quizes => quiz = quizes)
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