import React from 'react'
import { useEffect, useState } from "react"
import styles from '@/styles/TakeQuiz.module.scss';
import Layout from "@/components/Layout";

function QuizTaker({ quiz }) {
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

export default QuizTaker