import React from 'react';
import { useState } from 'react';
import styles from '@/styles/Home.module.scss';

import Link from 'next/link';

function Post({ quizData, i }) {
    
    const [loading, setLoading] = useState(false);
    const [hideQuiz, setHideQuiz] =useState(false);

    const handleDelete = async (x) =>{
        setLoading(true);
        let filter= x._id.toString();
        let response = await fetch(`../api/Quiz?id=${filter}`, {
          method: 'DELETE',
        });
        setHideQuiz(true);
        setLoading(false);
    }

  return (
    !hideQuiz && (
        <div className={styles.post}>
            <h2>
              <Link href={`/${quizData._id}`}  key={i}>
                {quizData.title}
                <img src='arrow.png' />
              </Link>
              
            </h2>
            <div className={styles.content}>
              <div>{quizData.description}</div>
              <small>{quizData.questions.length} Question{quizData.questions.length > 1 ? 's' : ''}</small>
              <div className={styles.subhead}>
                <small>{quizData.genre}</small>
                {i > 0 ? (
                  <div className={styles.buttons}>
                    <button onClick={() => handleDelete(quizData)} disabled={loading}><img src="trash.svg" /></button>
                    <button><Link href={`/update/${quizData._id}`}><img src="edit.svg" /></Link></button>
                  </div>
                ): 
                <small>sample quiz cannot be altered</small>}
              </div>
            </div>
        </div>
    )
  )
}

export default Post