import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions, SafeAreaView } from 'react-native';

// Get screen dimensions
const { height } = Dimensions.get('window');

// Sample questions array
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "Who wrote 'Hamlet'?",
    options: ["Leo Tolstoy", "Mark Twain", "William Shakespeare", "Charles Dickens"],
    correctAnswer: "William Shakespeare"
  }
];

const QuestionItem = ({ item }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (option === item.correctAnswer) {
      Alert.alert("Correct!", `You selected the correct answer: ${option}`);
    } else {
      Alert.alert("Wrong", `The correct answer is: ${item.correctAnswer}`);
    }
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      {item.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && { backgroundColor: 'lightgreen' }
          ]}
          onPress={() => handleOptionPress(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={questions}
        renderItem={({ item }) => <QuestionItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled // Enables page scrolling like Instagram reels
        showsVerticalScrollIndicator={false}
        snapToInterval={height} // Ensures each question takes up the full screen
        decelerationRate="fast" // Faster snapping to next question
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  questionContainer: {
    height: height, // Make sure the container takes up the full screen height
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#ddd',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  }
});

export default App;
