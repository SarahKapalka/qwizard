import Link from "next/link"
import { useEffect, useState } from "react"
import styles from '@/styles/TakeQuiz.module.scss';
import Layout from "@/components/Layout";


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

const [question, setQuestion] = useState(0);
const [answer, setAnswer] = useState(null);
const [answers, setAnswers] = useState([]);
const [testComplete, setTestComplete] = useState(false);
const [result, setResult] = useState(null);
const [right, setRight] = useState(0);
const { questions } = quiz;
  
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