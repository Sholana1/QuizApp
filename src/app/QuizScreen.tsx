import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import QuestionCard from "../components/QuestionCard";
import { useQuizContext } from "../providers/QuizProvider";
import questions from "../questions";
import { useTimer } from "../hooks/useTimer";
import party from "../../assets/party.json";

const QuizScreen = () => {
  const { question, questionIndex, onNext, score, bestScore } =
    useQuizContext();

  const { time, startTimer, clearTimer } = useTimer(20);

  useEffect(() => {
    startTimer();
    return () => {
      clearTimer();
    };
  }, [question]);

  useEffect(() => {
    if (time <= 0) {
      onNext();
    }
  }, [time]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={styles.title}>
            Question {questionIndex + 1}/{questions.length}
          </Text>
        </View>

        {/* Body */}
        {question ? (
          <View>
            <QuestionCard question={question} />
            <Text style={styles.text}>{time} sec</Text>
          </View>
        ) : (
          <>
            <LottieView
              style={StyleSheet.absoluteFill}
              autoPlay
              loop={false}
              source={require("../../assets/party.json")}
            />
            <Card title="Well done">
              <Text>Correct answer: {score}/5</Text>
              <Text>Best score: {bestScore}</Text>
            </Card>
          </>
        )}

        {/* Footer */}
        <CustomButton
          onPress={onNext}
          title="Next"
          rightIcon={
            <FontAwesome6 name="arrow-right-long" size={16} color="white" />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FDFEF4",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#005055",
  },
  text: {
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
    color: "#005055",
  },
});

export default QuizScreen;
