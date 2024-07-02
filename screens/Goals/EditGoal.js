import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditGoal = (props) => {

    const [goalName, setGoalName] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateType, setDateType] = useState("from");

    console.log("fromDate", fromDate);

    const onPickerValueChange = (e, selectedDate, dateType) => {

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
                            onPress={() => { setShowDatePicker(true); setDateType("from") }}
                            icon="calendar"
                            style={styles.dateButton}
                        >
                            {moment(fromDate.toDateString()).format("MMM Do YY")}
                        </Button>
                    </View>
                    <View style={{ marginLeft: "auto" }}>
                        <Text style={styles.label}>To :</Text>
                        <Button
                            mode="contained-tonal"
                            onPress={() => { setShowDatePicker(true); setDateType("to") }}
                            icon="calendar"
                            style={styles.dateButton}
                        >
                            {moment(toDate.toDateString()).format("MMM Do YY")}
                        </Button>
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dateType === "from" ? fromDate : toDate}
                            mode="date"
                            display="default"
                            onChange={(e, selectedDate) => {
                                const currentDate = selectedDate || fromDate;
                                setShowDatePicker(false);
                                setFromDate(currentDate);
                            }}
                        />
                    )}
                </View>

                <View style={styles.btnContainer}>
                    <Button mode='outlined'>
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
