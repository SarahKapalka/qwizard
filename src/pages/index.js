import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import Post from '@/components/Post';
import Layout from '@/components/Layout';
import Quiz from '../../models/Quiz';

export default function Home({quiz}) {
const quizList =JSON.parse(quiz)
  return (
    <Layout page="Homepage">
        <main className={styles.main}>
          {
            quizList.map((x,i)=>{
              return(
              <Post key={i} quizData={x} i={i}/>
              )

            })
          }
        </main>
      </Layout>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  let quiz;
  try{
    const quizes = await Quiz.find({}).then((data) => {
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