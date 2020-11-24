  import React, {useState} from 'react';
import { QuestionCard } from './components/QuestionCard';
import {fetchQuestions, Difficulty, questionState} from "./API";
import {GlobalStyle, Wrapper} from "./App.styles";

type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string
}


const totalQuestions = 10;


function App() {
  const [loading, setLoading]= useState(false);
  const [questions, setQuestions]= useState<questionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers]= useState<AnswerObject[]>([]);
  const [score, setScore]= useState(0);
  const [gameOver, setGameOver]= useState(true);

  

  const startQuiz =async ()=>{
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(totalQuestions, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setNumber(0);
    setUserAnswers([]);
    setLoading(false);
  };

  
  const NextQuestion = async()=>{
    const nextQuestion = number + 1;
    if (nextQuestion === totalQuestions) {
      setGameOver(true);
    }
    else{
      setNumber(nextQuestion);
    }
  };
  const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>)=>{
    if (!gameOver){
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if (correct){
      setScore(prev => prev+1)
    }
     const  answerObject = {
        question:questions[number].question,
        answer, 
        correct,
        correctAnswer: questions[number].correct_answer 
      }

      setUserAnswers(pre => [...pre, answerObject]);
    }
  };
  return (
    <>
    <GlobalStyle />
    
    <div className="App">
    <Wrapper>
    <h1>Quiz</h1>
    {gameOver || userAnswers.length === totalQuestions ? (
    <button className="start" onClick={startQuiz}>
     start Quiz
    </button> ): null}
    {!gameOver ? (
    <p className="score">
      score:{score}
    </p>
    ): null}
    {loading? (
    <p>
      loading...
    </p>
    ): null }
    {!loading && !gameOver ?(
     <QuestionCard 
    questionNum ={number + 1}
    totalQuestions = {totalQuestions}
    question = {questions[number].question}
    answers ={questions[number].answers}
    userAnswer = {userAnswers ? userAnswers[number] : undefined}
    callback = {checkAnswer}


    />): null}
    {!gameOver && !loading && userAnswers.length ===number+1 && number !== totalQuestions-1 ? (
    <button className="next" onClick={NextQuestion}>
      Next
    </button> ): null}
    </Wrapper>
    </div>
    
    </>
  );
}

export default App;
