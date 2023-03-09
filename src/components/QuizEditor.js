import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

function QuizEditor({ mode, quiz }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [title, setTitle] = useState(mode === "edit" ? quiz.title : "");
  const [description, setDescription] = useState(mode === "edit" ? quiz.description : "");
  const [genre, setGenre] = useState(mode === "edit" ? quiz.genre : "");
  const [module, setModule] = useState(false);
  const [questions,setQuestions] = useState(mode === "edit" ? quiz.questions : []);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [edit, setEdit] =useState([false, 0, 0]);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("Select the correct option")
  const opt = ["a", "b", "c", "d"];
  const genres = ["Book", "Comic", "Drama", "Entertainment", "Math", "Movie", "Music", "Personal", "Science", "Other"]

  const closeModule = () => {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("Select the correct option");
    setError('');
    setEdit([false,0,0])
    setModule(false)
  }

  const handleSubmit = async (e) =>{
    setLoading(true);
    e.preventDefault();
    let post={
      title, description, genre, questions
    }
    if(mode === "edit"){
      let response = await fetch(`../api/Quiz?filter=${quiz._id.toString()}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, genre, questions }),
      });
    } else{
      let response = await fetch('../api/Quiz', {
        method: 'POST',
        body: JSON.stringify({ title, description, genre, questions }),
      });
    }
    
    setLoading(false);
    router.push('/');
  }
  
  const submitQuestion = (e) => {
    setError('')
    e.preventDefault()
    const prevQuestions = questions;
    if(!edit[0]){
    prevQuestions.push({question: question, options: options, answer: answer})
    setQuestions(prevQuestions)
    }
    else{
      setQuestions([...questions.slice(0,edit[1]),{question: question, options: options, answer: options.includes(answer)? answer : options[edit[2]]},...questions.slice(edit[1]+1)])
    }
    closeModule();
  }
  const verifySubmit = (e) => {
    const withoutDuplicate = [...new Set(options)];
    withoutDuplicate.length < 4?
    setError("(Each option should be unique)"):
    submitQuestion(e);
  }
  const showOptions = () => {
    const rows = []
    for(let i = 0 ; i < 4 ; i++){
      rows.push(
      <input type="text" value={options[i]}
             onChange={(e) => {
               setOptions([...options.slice(0,i),e.target.value,...options.slice(i+1)])
      }}/>)
    }
    return rows
  }

  return (
    <div>
      {module &&
      (
        <div className={styles.module}>
          <div className={styles.dropshadow} onClick={() => closeModule()}></div>
          <div className={styles.box}>
            <div>Add question</div>
            <form>
              <label htmlFor="question">Question</label>
              <input id="question" type="text" value={question} onChange={(e) => setQuestion(e.target.value)}/>
              <div>Options</div>
              <div id="options" className={styles.options}>
                {showOptions()}
              </div>
              <select defaultValue={answer} onChange={(e) => setAnswer(e.target.value)}>
                <option value="Select the correct option" disabled>Select the correct answer</option>
                {options.map((x,i) => <option key={i} value={x} hidden={x.length===0}>{x}</option>)}
              </select>
              <small>{error}</small>
              <div className={styles.moduleButtons}>
                <button type="button" onClick={() => closeModule()} className={styles.secondaryButton}>Cancel</button>
                <button type="button" onClick={(e) => verifySubmit(e)} disabled={answer==="Select the correct option" || options.some((option) => option.length < 1) || !question} className={styles.primaryButton}>Submit</button>
              </div>
            </form>

          </div>
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title" >Quiz Title</label>
        <input id= "title" type="text" placeholder="Enter quiz title here..." value={title} onChange={(e) => setTitle(e.target.value)} required></input>
        <div className={styles.question}>
          <label htmlFor="description">Description</label>
          <textarea id="description" type="text" placeholder="Enter description on quiz here..." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          <label htmlFor='genre'>Genre</label>
          <select id="genre" defaultValue="genre" onChange={(e) => setGenre(e.target.value)} required>
            <option value="genre" disabled>Select a Genre</option>
            {genres.map((genre, index) => <option value={genre} key={index}>{genre}</option>)}
          </select>
        </div>
        <div>
          {questions.map((x,i) => {
             return(
              <div key={i}>
              <div>{x.question}</div>
              <div>{x.options.map((x, i)=> <div key={i}>{opt[i]}.{x}</div>)}</div>
              <div>answer: {x.answer}</div>
              <button type="button" onClick={() => {
                setModule(true);
                setEdit([true, i, x.options.indexOf(x.answer)]);
                setQuestion(x.question);
                setOptions(x.options);
                setAnswer(x.answer);
                }}>update</button>
              <button type="button" onClick={() => setQuestions([...questions.slice(0,i),...questions.slice(i+1)])}>remove</button>
              </div>
             )
          })}
        </div>
        <button onClick={() => setModule(true)} type="button" className={styles.secondaryButton}>Add question</button>
        {questions.length === 0 && (
          <small>(you must have atleast one question)</small>
        )}
        <button type="submit" disabled={loading || questions.length === 0 || genre === ""} className={styles.primaryButton}>Submit</button>
      </form>
    </div>
  )
}

export default QuizEditor