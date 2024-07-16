import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { recreateGoalNewTimeline, updateGoal } from '../../NetworkCalls/networkCalls';


const EditRecreateGoal = (props) => {

    let goalTitle = props.goalData.topic_name;
    let start_date = props.goalData.start_date;
    let end_date = props.goalData.end_date;

    const [goalName, setGoalName] = useState(goalTitle);
    const [fromDate, setFromDate] = useState(start_date);
    const [toDate, setToDate] = useState(end_date);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    // console.log("Date", fromDate, toDate);
    // console.log("actionType:", props.goalData.id);

    const udpateGoalData = () => {
        let startDate = moment(fromDate).format("YYYY-MM-DD")
        let endDate = moment(toDate).format("YYYY-MM-DD")
        let payloadData = {
            topicname: goalName,
            startdate: startDate,
            enddate: endDate
        }
        let hasNoDataChanged = goalName === goalTitle && start_date === fromDate && end_date === toDate;

        if (!hasNoDataChanged) {
            updateGoal(payloadData, props.goalData.id)
                .then((res) => {
                    let result = res.data;
                    props.refreshPage();
                    props.closeEditMode(false);
                })
                .catch((err) => {
                    console.log("Error While Updating Goal", err);
                })
        } else {
            props.closeEditMode(false);
        }
    }

    const recreateGoal = () => {
        let startDate = moment(fromDate).format("YYYY-MM-DD")
        let endDate = moment(toDate).format("YYYY-MM-DD")
        let payloadData = {
            topicid: props.goalData.id,
            topicname: goalName,
            startdate: startDate,
            enddate: endDate,
            tasks: props.goalData.tasks
        }

        // console.log("payloadData:", payloadData);
        recreateGoalNewTimeline(payloadData)
            .then((res) => {
                let result = res.data;
                console.log("result:", result);
                props.refreshPage();
                props.closeEditMode(false);
            })
            .catch((err) => {
                console.log("Error While Recreating Goal with New Timeline", err);
            })
    }

    return (
        <Card style={styles.container}>
            <Card.Content>
                <TextInput
                    value={goalName}
                    onChangeText={setGoalName}
                    mode='outlined'
                    label="Goal Name"
                    style={{ height: 45 }}
                />

                <View style={styles.btnContainer}>
                    <View style={{ marginRight: "auto" }}>
                        <Text style={styles.label}>From:</Text>
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
                                value={new Date(fromDate)}
                                mode="date"
                                display="default"
                                onChange={(e, selectedDate) => {
                                    const currentDate = selectedDate || fromDate;
                                    setShowFromDatePicker(false);
                                    setFromDate(currentDate);
                                }}
                                maximumDate={new Date(fromDate)}
                            />
                        )}
                    </View>
                    <View style={{ marginLeft: "auto" }}>
                        <Text style={styles.label}>To :</Text>
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
                                value={new Date(toDate)}
                                mode="date"
                                display="default"
                                onChange={(e, selectedDate) => {
                                    const currentDate = selectedDate || toDate;
                                    setShowToDatePicker(false);
                                    setToDate(currentDate);
                                }}
                                // minimumDate={props.actionType === "edit" ? new Date(fromDate) : new Date()}
                            />
                        )}
                    </View>
                </View>

                <View style={styles.btnContainer}>
                    <Button
                        mode='outlined'
                        onPress={() => { props.actionType === "edit" ? udpateGoalData() : recreateGoal() }}
                    >
                        Save
                    </Button>
                    <Button
                        mode='outlined'
                        onPress={() => props.closeEditMode(false)}
                    >
                        Cancel
                    </Button>
                </View>
            </Card.Content>
        </Card>
    )
}

export default EditRecreateGoal;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: "white",
        marginBottom: 1
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    dateButton: {
        marginBottom: 20,
        borderRadius: 5,
        width: "100%"
    },
})
