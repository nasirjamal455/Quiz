import {shuffleArray} from "./utilities";
export const fetchQuestions = async(amount:number,difficulty:Difficulty )=>{
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data =await (await fetch(endPoint)).json();
    console.log(data);
    return data.results.map((question: Question)=>({
        ...question,
        answers:shuffleArray( [...question.incorrect_answers, question.correct_answer])
    }
     ))
    
    
}

export enum Difficulty {
    EASY="easy",
    MDEIUM = "medium",
    HARD = "hard"
}
export type Question ={
    category: string;
    correct_answer:string;
    difficulty: string;
    incorrect_answers: string[];
    question:string;
    type:string;

} 
export type questionState = Question & { answers:string[] };
