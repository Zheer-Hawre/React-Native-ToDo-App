import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  // creating states:
  // const [stateName, functionToSetTheState] = useState();
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask(null); //to empty the textArea.
  };

  const completeTask = (index) => {
    let copyItem = [...taskItems];
    copyItem.splice(index, 1); //deletes the task we tap on.
    setTaskItems(copyItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Todays Tasks: */}
      <ScrollView style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todays Tasks</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          /* everytime the text changes set the task to that text */
          onChangeText={(text) => setTask(text)}
          value={task}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },

  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {},
});
