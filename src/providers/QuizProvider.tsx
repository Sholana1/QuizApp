import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import questions from '../questions'
import { Question } from '../type'

type QuizContext = {
    question?: Question;
    questionIndex: number;
    onNext: () => void;
    selectedOption?: string;
    setSelectedOption: (newOption: string) => void;
    score: number;
    totalQuestion: number;
    bestScore: number
}

const QuizContext = createContext<QuizContext>({
    questionIndex: 0,
    onNext: () => {},
    setSelectedOption: () => {},
    score: 0,
    totalQuestion: 0,
    bestScore: 0
})

const QuizProvider = ({children}: PropsWithChildren) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const question = questions[questionIndex];

    const [selectedOption, setSelectedOption] = useState<string | undefined>();
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore ] = useState(0);
    const isFinished = questionIndex >= questions.length;

    useEffect(() => {
        loadBestScore()
    }, [])

    useEffect(() => {
        // check the best score
        if(isFinished === true && score > bestScore) {
            setBestScore(score);
            saveBestScore(score);
        }
    }, [isFinished])

    const restart = () => {
        setQuestionIndex(0);
        setSelectedOption("");
        setScore(0);
    }

    const onNext = () => {
        if(isFinished){
            restart();
            return;
        }
        if(selectedOption === question.correctAnswer){
            setScore((currentValue) => currentValue + 1);
        }
        setQuestionIndex(currentValue => currentValue + 1);
    } 

    const saveBestScore = async(value: number) => {
        try {
            await AsyncStorage.setItem('best-score', bestScore.toString());
        } catch (e) {
            
        }
    }
    

    const loadBestScore = async() => {

        try {
            const value = await AsyncStorage.getItem('best-score')

            if(value !== null) {
                setBestScore(Number.parseInt(value));
            }
        } catch (e) {
            
        }
    }

  return (
    <QuizContext.Provider value={{question, questionIndex, onNext, selectedOption, setSelectedOption, score, totalQuestion: questions.length, bestScore}}>
      {children}
    </QuizContext.Provider>
  )
}
export const useQuizContext = () => useContext(QuizContext);

export default QuizProvider