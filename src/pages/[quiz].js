import dbConnect from 'utils/dbConnect';
import Quiz from '../../models/Quiz';
import QuizTaker from "@/components/QuizTaker";
import ErrorPage from 'next/error'

export async function getServerSideProps(context) {
  dbConnect();
  let quiz;
  try{
    const quizes = await Quiz.findById(context.params.quiz).then((data) => {
      quiz = JSON.stringify(data)}); 
    }catch(error) {
      quiz = JSON.stringify({data: 'not found'})
    }
    return {
      props: {
      quiz,
      },
    }
}

const Post = ({ quiz }) => {
return (
  JSON.parse(quiz)._id === undefined?
  <ErrorPage statusCode={"404 not found"} />:
  <QuizTaker quiz={quiz} />
)
}

export default Post