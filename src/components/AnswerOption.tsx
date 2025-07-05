import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useQuizContext } from '../providers/QuizProvider';


type AnswerOption = {
  option: string;
  
}

const AnswerOption = ({option}: AnswerOption) => {
  const {selectedOption, setSelectedOption} = useQuizContext();

  const isSelected = option === selectedOption
  return (
    <Pressable onPress={() => setSelectedOption(option)} style={[styles.container, isSelected && {
      backgroundColor: "#E1F396",
      borderColor: "#E1F396"
    }]} >
      <Text>{option}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 20,
        padding: 20,
    }
})

export default AnswerOption