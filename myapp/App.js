import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      // Adjust the URL to your Gitpod URL
      const response = await fetch('https://3000-crackingwalnuts-todoapp-gfb7ol2oosj.ws-eu108.gitpod.io/todolist');
      const todos = await response.json();
      setTodos(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      await fetch('https://3000-crackingwalnuts-todoapp-gfb7ol2oosj.ws-eu108.gitpod.io/todolist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      setTask('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await fetch(`https://3000-crackingwalnuts-todoapp-gfb7ol2oosj.ws-eu108.gitpod.io/todolist/${todoId}`, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.task}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item._id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  todoText: {
    fontSize: 18,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
});


export default App;
//make babel.config.js a json: babel.config.json with content
//  {
//  "presets": ["babel-preset-expo"]
//  }
// npx create-expo-app --template
// docker pull mongo
//docker run --name mymongo -d -p 27017:27017 mongo
