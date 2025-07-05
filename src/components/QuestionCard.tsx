import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AnswerOption from './AnswerOption'
import { Question } from '../type'
import Card from './Card'

type QuestionCard ={
  question: Question
}

const QuestionCard = ({question}: QuestionCard) => {
  return (
    <Card title={question.title}>
      <View style={{gap: 10}}>
        {question.options.map((option) => (
        <AnswerOption key={option} option={option}/>
      ))}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  questionCard:{
    backgroundColor: "white",
    padding: 20,
    paddingVertical: 40,
    borderRadius: 20,
    gap: 20,

    // shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
      },
      question:{
        fontSize: 24,
        fontWeight: "500"
      }
})

export default QuestionCard