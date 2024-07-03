import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateGoal } from '../../NetworkCalls/networkCalls';

const EditGoal = (props) => {

    let goalTitle = props.goalData.topic_name;
    let start_date = props.goalData.start_date;
    let end_date = props.goalData.end_date;

    const [goalName, setGoalName] = useState(goalTitle);
    const [fromDate, setFromDate] = useState(start_date);
    const [toDate, setToDate] = useState(end_date);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    // console.log("Date", fromDate, toDate);

    const udpateGoalData = () => {
        let start_date = moment(fromDate).format("YYYY-MM-DD")
        let end_date = moment(toDate).format("YYYY-MM-DD")
        let payloadData = {
            topicname: goalName,
            startdate: start_date,
            enddate: end_date
        }
        let noDataChange = goalName === goalTitle && start_date === fromDate && end_date === toDate;

        if (!noDataChange) {
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
                            />
                        )}
                    </View>

                </View>

                <View style={styles.btnContainer}>
                    <Button
                        mode='outlined'
                        onPress={() => udpateGoalData()}
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

export default EditGoal;

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
