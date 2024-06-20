import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Button, Menu, Provider, TextInput as PaperTextInput, Title, Card, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateUpdateGoal = () => {
  const [listName, setListName] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [task, setTask] = useState('');
  const [unit, setUnit] = useState('');
  const [units, setUnits] = useState(['kms', 'hours', 'nos']);
  const [tasks, setTasks] = useState([]);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [addingNewUnit, setAddingNewUnit] = useState(false);
  const [newUnit, setNewUnit] = useState('');

  const addTask = () => {
    setTasks([...tasks, { task, unit }]);
    setTask('');
    setUnit('');
  };

  const saveList = () => {
    // Handle save logic here
    console.log({ listName, fromDate, toDate, tasks });
  };

  const addNewUnit = () => {
    if (newUnit.trim() && !units.includes(newUnit.trim())) {
      setUnits([...units, newUnit.trim()]);
      setUnit(newUnit.trim());
      setNewUnit('');
      setAddingNewUnit(false);
    }
    setMenuVisible(false);
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.header}>New List</Title>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Name Your List</Text>
            <PaperTextInput
              style={styles.input}
              value={listName}
              onChangeText={setListName}
              placeholder="A Good Health"
              mode="outlined"
            />
            <Text style={styles.label}>From</Text>
            <Button
              mode="outlined"
              onPress={() => setShowFromDatePicker(true)}
              icon="calendar"
              style={styles.dateButton}
            >
              {fromDate.toDateString()}
            </Button>
            {showFromDatePicker && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || fromDate;
                  setShowFromDatePicker(false);
                  setFromDate(currentDate);
                }}
              />
            )}
            <Text style={styles.label}>To</Text>
            <Button
              mode="outlined"
              onPress={() => setShowToDatePicker(true)}
              icon="calendar"
              style={styles.dateButton}
            >
              {toDate.toDateString()}
            </Button>
            {showToDatePicker && (
              <DateTimePicker
                value={toDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || toDate;
                  setShowToDatePicker(false);
                  setToDate(currentDate);
                }}
              />
            )}
            <Text style={styles.label}>Task</Text>
            <PaperTextInput
              style={styles.input}
              value={task}
              onChangeText={setTask}
              placeholder="Task"
              mode="outlined"
            />
            <Text style={styles.label}>Unit</Text>
            {!addingNewUnit && (
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setMenuVisible(true)}
                    style={styles.unitButton}
                    icon="chevron-down"
                  >
                    {unit || 'Select Unit'}
                  </Button>
                }
              >
                {units.map((unitItem, index) => (
                  <Menu.Item key={index} onPress={() => { setUnit(unitItem); setMenuVisible(false); }} title={unitItem} />
                ))}
                <Menu.Item onPress={() => { setAddingNewUnit(true); setMenuVisible(false); }} title="Add New Unit" />
              </Menu>
            )}
            {addingNewUnit && (
              <View style={styles.newUnitContainer}>
                <PaperTextInput
                  style={styles.input}
                  value={newUnit}
                  onChangeText={setNewUnit}
                  placeholder="Enter new unit"
                  mode="outlined"
                />
                <Button mode="contained" onPress={addNewUnit} style={styles.addUnitButton}>
                  Add Unit
                </Button>
              </View>
            )}
            <Button mode="contained" onPress={addTask} style={styles.addButton}>
              Add Task
            </Button>
            <FlatList
              data={tasks}
              renderItem={({ item }) => (
                <View style={styles.taskContainer}>
                  <Text>{item.task}</Text>
                  <Text>{item.unit}</Text>
                  <IconButton icon="delete" onPress={() => {
                    const newTasks = tasks.filter(taskItem => taskItem !== item);
                    setTasks(newTasks);
                  }} />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </Card.Content>
        </Card>
        <Button mode="contained" onPress={saveList} style={styles.saveButton}>
          Save List
        </Button>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    marginBottom: 20,
  },
  dateButton: {
    marginBottom: 20,
  },
  unitButton: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  newUnitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addUnitButton: {
    marginLeft: 10,
  },
  addButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  saveButton: {
    marginTop: 20,
  },
});

export default CreateUpdateGoal;