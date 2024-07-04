import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { Button, Menu, Provider, TextInput as PaperTextInput, Title, Card, IconButton, DropDown, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView, NativeViewGestureHandler } from 'react-native-gesture-handler';
import { createGoal } from '../../NetworkCalls/networkCalls';
import { RedStar } from '../../utilities/utils';
import moment from 'moment';
import { CustomDropDownPicker } from '../../utilities/formComponents';

const CreateUpdateGoal = ({ navigation }) => {
    const [goalName, setGoalName] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [task, setTask] = useState('');
    const [countOfTask, setCountOfTask] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [unitValue, setUnitValue] = useState(null);

    // console.log("unitValue", unitValue)

    const addTask = () => {
        let systemDefinedUnits = ["nos", "kms", "hrs"]
        let isUnitSystemDefined = systemDefinedUnits.includes(unitValue)

        if (task && unitValue && countOfTask) {
            setTasks([...tasks, {
                "taskname": task,
                "system_defined_unit": isUnitSystemDefined ? unitValue : null,
                "value": countOfTask,
                "user_defined_unit": !isUnitSystemDefined ? unitValue : null
            }]
            );
            setTask('');
            setCountOfTask(0);
            // setUnit('');
        }
        else {
            alert("Please fill all the details for adding Task")
        }
    };

    const onSave = () => {
        if (!goalName && !startdate && !enddate) {
            alert("Please Fill the required details")
            return
        }
        let startdate = fromDate.toISOString().split('T')[0]
        let enddate = toDate.toISOString().split('T')[0]
        let payloadData = {
            topicname: goalName,
            startdate: startdate,
            enddate: enddate,
            tasks: tasks
        }
        // console.log("payloadData", payloadData);
        // console.log({ goalName, fromDate, toDate, tasks, countOfTask });

        createGoal(payloadData)
            .then((res) => {
                let result = res.data
                if (result.success) {
                    Alert.alert("Success", `${result.status}`, [
                        {
                            text: "OK",
                            onPress: () => { },
                        }
                    ]);
                }
                navigation.navigate("All Goals");
            })
            .catch((err) => {
                console.log("Error while creating Goal", err);
            })
    };

    return (
        <Provider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView style={styles.container}>
                        {/* <NativeViewGestureHandler> */}
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* <Title style={styles.header}>New List</Title> */}
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Text style={styles.label}>Goal: {<RedStar />}</Text>
                                    <PaperTextInput
                                        style={styles.input}
                                        value={goalName}
                                        onChangeText={setGoalName}
                                        placeholder="your goal here..."
                                        mode="outlined"
                                    />
                                    <Divider />
                                    <Divider />
                                    <View style={styles.datepickerContainer}>
                                        <View style={{ marginRight: "auto" }}>
                                            <Text style={styles.label}>From: {<RedStar />}</Text>
                                            <Button
                                                mode="contained-tonal"
                                                onPress={() => setShowFromDatePicker(true)}
                                                icon="calendar"
                                                style={styles.dateButton}
                                            >
                                                {moment(fromDate).format("MMM Do YY")}
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
                                        </View>
                                        <View style={{ marginLeft: "auto" }}>
                                            <Text style={styles.label}>To: {<RedStar />}</Text>
                                            <Button
                                                mode="contained-tonal"
                                                onPress={() => setShowToDatePicker(true)}
                                                icon="calendar"
                                                style={styles.dateButton}
                                            >
                                                {moment(toDate).format("MMM Do YY")}
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
                                        </View>
                                    </View>
                                    <Divider />
                                    <Divider />

                                    <Text style={styles.label}>Task</Text>
                                    <PaperTextInput
                                        style={styles.input}
                                        value={task}
                                        onChangeText={setTask}
                                        placeholder="Enter task name.."
                                        mode="outlined"
                                    />

                                    <Text style={styles.unitLabel}>Unit</Text>
                                    <CustomDropDownPicker
                                        unitValue={(unit) => setUnitValue(unit)}
                                    />

                                    <Text style={styles.label}>Count of Task:</Text>
                                    <PaperTextInput
                                        style={styles.input}
                                        value={countOfTask.toString()}
                                        onChangeText={setCountOfTask}
                                        placeholder="enter task count.."
                                        mode="outlined"
                                        keyboardType='numeric'
                                    />

                                    <Button mode="contained-tonal" onPress={addTask} style={styles.addButton}>
                                        Add Task
                                    </Button>
                                    {/* <FlatList
                                        data={tasks}
                                        renderItem={({ item }) => (
                                            <View style={styles.taskContainer}>
                                                <Text>{item.taskname}</Text>
                                                <Text>{item.value}</Text>
                                                <Text>{item.system_defined_unit}</Text>
                                                <IconButton icon="delete" onPress={() => {
                                                    const newTasks = tasks.filter(taskItem => taskItem !== item);
                                                    setTasks(newTasks);
                                                }} />
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    /> */}

                                    {tasks?.map((item) => {
                                        return (
                                            <View style={styles.taskContainer} key={item.index}>
                                                <Text>{item.taskname}</Text>
                                                <Text>{item.value}</Text>
                                                <Text>{item.system_defined_unit}</Text>
                                                <IconButton icon="delete" onPress={() => {
                                                    const newTasks = tasks.filter(taskItem => taskItem !== item);
                                                    setTasks(newTasks);
                                                }} />
                                            </View>
                                        )
                                    })}
                                </Card.Content>
                            </Card>
                            <Button mode="contained" onPress={onSave} style={styles.saveButton}>
                                Save List
                            </Button>
                        </ScrollView>
                        {/* </NativeViewGestureHandler> */}
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </GestureHandlerRootView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    scrollContainer: {
        // padding: 20,
    },
    datepickerContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    dropdown: {
        marginBottom: 10
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
        backgroundColor: "white"
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    unitLabel: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        marginBottom: 20,
    },
    dateButton: {
        marginBottom: 20,
        borderRadius: 5,
    },
    unitButton: {
        justifyContent: 'space-between',
        marginBottom: 20,
        borderRadius: 5,
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
        borderRadius: 5,
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
        marginTop: 10,
        borderRadius: 5,
    },
});

export default CreateUpdateGoal;