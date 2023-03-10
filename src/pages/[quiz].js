import { useEffect, useState } from "react"
import styles from '@/styles/TakeQuiz.module.scss';
import Layout from "@/components/Layout";
import dbConnect from 'utils/dbConnect';
import Quiz from '../../models/Quiz';


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

const [question, setQuestion] = useState(0);
const [answer, setAnswer] = useState(null);
const [answers, setAnswers] = useState([]);
const [testComplete, setTestComplete] = useState(false);
const [result, setResult] = useState(null);
const [right, setRight] = useState(0);
const { questions } = JSON.parse(quiz);
  
useEffect(() => {
  if (testComplete){
    setResult(`You scored ${right} right answers out of ${questions.length} questions!`)
  }
}, [ answers ])

return (
  <Layout>
    <div>
      <div className={styles.container}>
        <small>Question {question+1} of {questions.length}</small>
        <h1>{questions[question].question}</h1>
        <div>
          {questions[question]["options"].map((value, index) => <button key={index} onClick={() => setAnswer(value)} className={value === answer ? styles.active : ""} disabled={testComplete}>{value}</button>)}
        </div>
        <span>
          <button onClick={() => {
            answer === questions[question]["answer"] ? setRight(right+1) : null
            setAnswers(answers => [...answers, answer]);
            setAnswer(null);
            if (question < questions.length + -1){
              setQuestion(question+1)
            }
            else{
              setTestComplete(true)
            }
            }}
              disabled={answer === null ? true : false}>
              {question < questions.length - 1? "Next" : "Submit"}
          </button>
          {/* <button
          className={styles.retry}
          onClick={()=> {setAnswers([]); setQuestion(0); setTestComplete(false)}}>
            O
          </button> */}
        </span>
          {testComplete && (
            <div>{result}</div>
          )}
      </div>
    </div>
  </Layout>
)
}

export default Post