import QuizEditor from '@/components/QuizEditor';
import Layout from '@/components/Layout';
import dbConnect from 'utils/dbConnect';
import Quiz from '../../../models/Quiz';

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  dbConnect();
  let quiz = [];
  try{
        const quizes = await Quiz.find({}).then((data) => {
           quiz= data;
           console.log(quiz);
    }); 
}catch(error) {
   console.log({ data : 'loading'}, error); 
}
    const paths = quiz.map((quiz)=>{return {params: {quiz: quiz.id}}})
    console.log(paths);
    return {
      paths,
      fallback: false, // can also be true or 'blocking'
    }
  }
  
  // `getStaticPaths` requires using `getStaticProps`
  export async function getStaticProps(context) {
    let quiz;
    try{
      const quizes = await Quiz.findById(context.params.quiz).then((data) => {
              quiz= JSON.stringify(data);
              console.log(typeof quiz);
        }); 
      }catch(error) {
      console.log({ data : 'loading'}, error); 
      }
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
      <QuizEditor mode="edit" quiz={JSON.parse(quiz)}/>
    </Layout>
  )
}

export default Post