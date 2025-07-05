import { StatusBar } from 'expo-status-bar';
import QuizScreen from './src/app/QuizScreen';
import QuizProvider from './src/providers/QuizProvider';

export default function App() {
  return (
    <QuizProvider>
      <QuizScreen />  
      <StatusBar style="auto" />
    </QuizProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
// });
