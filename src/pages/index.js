import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import Post from '@/components/Post';
import Layout from '@/components/Layout';

export default function Home({quizes}) {

  return (
    <Layout page="Homepage">
        <main className={styles.main}>
          {
            quizes.map((x,i)=>{
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
  const res = await fetch('http://localhost:3000/api/Quiz', {
    method: 'GET',
  })
  const quizes = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      quizes,
    },
  }
}