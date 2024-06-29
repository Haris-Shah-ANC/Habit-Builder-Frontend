import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton, { DeleteLogo } from '../../utilities/HeaderButtons';
import moment from 'moment';
import { Button, Card, Modal, Provider, Divider } from 'react-native-paper';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { deleteSpecificSubGoal, deleteTimeStamp, getAllTimeStamps, incrementSubGoalCount } from '../../NetworkCalls/networkCalls';
import { CenterText } from '../../utilities/utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';

const IndividualGoal = (props) => {

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [timeStampsList, setTimeStampsList] = React.useState(null);

    let startDate = moment(props.route.params.goalData.created_at);
    let endDate = moment(props.route.params.goalData.end_date);
    let [subGoalsList, setSubGoalsList] = React.useState(props.route.params.goalData.tasks)

    React.useEffect(() => {
        props.navigation.setOptions({
            headerTitle: props.route.params.goalData.topic_name,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Text style={{ fontWeight: "bold" }}>
                        {`${startDate.format("DD MMM YY").slice(0, -3)} - ${endDate.format("DD MMM YY").slice(0, -3)}`}
                    </Text>
                </HeaderButtons>
            ),
        })
    })

    const deleteSubGoal = (subGoalId) => {
        deleteSpecificSubGoal(subGoalId)
            .then((res) => {
                let result = res.data;
                if (result.success === true) {
                    let newSubGoalsList = subGoalsList.filter((subGoal) => {
                        return subGoal.id !== subGoalId
                    })
                    setSubGoalsList(newSubGoalsList);
                }
            })
            .catch((err) => {
                console.log("Error while deleting SubGoal", err)
            })
    }

    const addSubGaolCount = (subGoalId, date, time, type) => {
        let currentTimestamp = moment().format('YYYY-MM-DD H:mm:ss');
        let formattedDate = moment(date, "YYYY-MM-DDTH:mm:ss").format("YYYY-MM-DD")
        let formattedTime = moment(time, "YYYY-MM-DDTH:mm:ss").format("H:mm:ss")
        let manualTimeStamp = `${formattedDate} ${formattedTime}`
        let payloadData = {
            timestamp: type === "current" ? currentTimestamp : manualTimeStamp
        }
        incrementSubGoalCount(payloadData, subGoalId)
            .then((res) => {
                let result = res.data;
                if (result.success === true) {
                    let newSubGoalsList = subGoalsList.filter((subGoal) => {
                        if (subGoal.id !== subGoalId) {
                            return subGoal
                        } else {
                            subGoal.completed_times += 1
                            return subGoal
                        }
                    })
                    setSubGoalsList(newSubGoalsList);
                    fetchTimeStampList(subGoalId);
                }

            })
            .catch((err) => {
                console.log("Error while Incrementing SubGoal Count", err);
            })
    }

    const fetchTimeStampList = (subGoalId) => {
        getAllTimeStamps(subGoalId)
            .then((res) => {
                let result = res.data;
                if (result.success === true) {
                    setTimeStampsList(result.taskcompleted);
                }
            })
            .catch((err) => {
                console.log("Error while fetching TimeStamps List", err)
            })
    }

    const deleteTimeStampEntry = (timeStampId, subGoalId) => {
        deleteTimeStamp(timeStampId)
            .then((res) => {
                let result = res.data;
                if (result.success === true) {
                    let newTimeStampList = timeStampsList.filter((timeStamp) => {
                        return timeStamp.id !== timeStampId
                    })
                    let newSubGoalsList = subGoalsList.filter((subGoal) => {
                        if (subGoal.id !== subGoalId) {
                            return subGoal
                        } else {
                            subGoal.completed_times -= 1
                            return subGoal
                        }
                    })
                    setSubGoalsList(newSubGoalsList);
                    setTimeStampsList(newTimeStampList);
                }
            })
            .catch((err) => {
                console.log("Error while deleting TimeStamp", err);
            })
    }

    return (
        <>
            <ScrollView>
                {subGoalsList.map(subGoal => (
                    <SubGoalView
                        subGoalData={subGoal}
                        key={subGoal.id}
                        handleDelete={(subGoalId) => deleteSubGoal(subGoalId)}
                        showModal={() => setIsModalVisible(true)}
                        handleAddClick={(subGoalId, date, time, type) => addSubGaolCount(subGoalId, date, time, type)}
                        getTimeStampsList={(subGoalId) => fetchTimeStampList(subGoalId)}
                        handleTimeStampDelete={(timeStampId, subGoalId) => deleteTimeStampEntry(timeStampId, subGoalId)}
                        timeStampsList={timeStampsList}
                    />
                ))}
            </ScrollView>
            <Modal
                visible={isModalVisible}
                onDismiss={() => setIsModalVisible(false)}
                contentContainerStyle={styles.modalContainer}
            >
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
        </>
    )
}

const SubGoalView = (props) => {
    const [editableRowId, setEditableRowId] = React.useState(null);
    const [isPickerVisible, setIsPickerVisible] = React.useState(false);
    const [pickerMode, setPickerMode] = React.useState("date");
    const [datePickerData, setDatePickerData] = React.useState(new Date());
    const [timePickerData, setTimePickerData] = React.useState(new Date());
    const [showAddWindow, setShowAddWindow] = React.useState(false);
    let bottomSheet = React.useRef();
    let totalTimes = props.subGoalData.times;
    let completedTimes = props.subGoalData.completed_times ? props.subGoalData.completed_times : 0



    const showMode = (currentMode) => {
        setIsPickerVisible(true);
        setPickerMode(currentMode);
    };

    const onPickerValueChange = (event, selectedDate, mode) => {
        const currentDate = selectedDate || date;
        // console.log("currentDate", moment(currentDate).format("MMM Do YY"));
        if (mode === "date") {
            setDatePickerData(currentDate);
            setIsPickerVisible(false);
            return
        } else {
            setTimePickerData(currentDate);
            setIsPickerVisible(false);
            return
        }
    };

    return (
        <Provider>
            <Card style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={() => {
                        bottomSheet.current.show();
                        props.getTimeStampsList(props.subGoalData.id)
                    }}
                >
                    <View style={styles.cartTitle}>
                        <Card.Title title={props.subGoalData.taskname} style={{ marginRight: "auto" }} />
                        <Button
                            onPress={() => Alert.alert("Are you sure you want delete this SubGoal?", "Press cancel to go back", [
                                {
                                    text: "Cancel   ",
                                    onPress: () => { },
                                },
                                {
                                    text: "Delete",
                                    onPress: () => { props.handleDelete(props.subGoalData.id) },
                                },
                            ])}
                        >
                            <DeleteLogo />
                        </Button>

                    </View>
                    <Card.Content>
                        <Text style={styles.countText}>
                            {`${completedTimes}/${totalTimes}`}
                        </Text>
                    </Card.Content>
                </TouchableOpacity>
                {completedTimes < totalTimes ? (
                    <Button
                        mode="outlined"
                        style={styles.plusOneButton}
                        // onPress={props.showModal}
                        onPress={() => props.handleAddClick(props.subGoalData.id, "", "", "current")}
                    >
                        +1
                    </Button>
                ) :
                    (
                        <CenterText text={"Goal Completed"} />
                    )
                }
            </Card>

            <BottomSheet ref={bottomSheet} height={500} style={{ position: "absolute", backgroundColor: "green" }}>
                <ScrollView>
                    <Card style={styles.cardContainer}>
                        <View style={styles.cartTitle}>
                            <Card.Title title={props.subGoalData.taskname} style={{ marginRight: "auto" }} />
                            <Text style={styles.countText}>
                                {`${completedTimes}/${props.subGoalData.times}`}
                            </Text>
                        </View>
                        <Divider />
                        {!showAddWindow &&
                            <Button
                                icon={"plus"}
                                onPress={() => setShowAddWindow(true)}
                            >
                                Add New
                            </Button>
                        }
                        {showAddWindow && (
                            <View >
                                <View style={{ flexDirection: "row", marginLeft: "13%" }}>
                                    <Button
                                        onPress={() => showMode("date")}
                                        icon="calendar"
                                    >
                                        {datePickerData.toDateString().slice(0, -5)}
                                    </Button>
                                    <Button
                                        style={{ marginLeft: -10 }}
                                        onPress={() => showMode("time")}
                                        icon="clock"
                                    >
                                        {timePickerData.toTimeString().slice(0, -12)}
                                    </Button>
                                </View>
                                <View style={styles.editableContainer}>
                                    <Button
                                        mode='contained-tonal'
                                        style={styles.saveBtn}
                                        onPress={() => setShowAddWindow(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        mode='contained-tonal'
                                        style={styles.saveBtn}
                                        onPress={() => { setShowAddWindow(false); props.handleAddClick(props.subGoalData.id, datePickerData, timePickerData, "manual") }}
                                    >
                                        Save
                                    </Button>
                                </View>
                                {isPickerVisible && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={pickerMode === "date" ? datePickerData : timePickerData}
                                        mode={pickerMode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, selectedDate) => onPickerValueChange(event, selectedDate, pickerMode)}
                                    />
                                )}
                            </View>
                        )}
                        <Divider />
                        {props.timeStampsList?.map((timeStamp) => {
                            return (
                                <View key={timeStamp.id}>
                                    <View style={styles.bottomSheetContainer}>
                                        {/* {editableRowId !== timeStamp.id ?
                                        ( */}
                                        <>
                                            <Text style={styles.bottomSheetText}>
                                                {moment(timeStamp.timestamp, "YYYY-MM-DDTH:mm:ss").format('MMM Do YY, h:mm a')}
                                            </Text>

                                            {/* <Button
                                            icon={"pen"}
                                            onPress={() => setEditableRowId(timeStamp.id)}
                                        /> */}
                                            <Button
                                                icon={"delete"}
                                                onPress={() => Alert.alert("Are you sure you want delete this TimeStamp?", "Press cancel to go back", [
                                                    {
                                                        text: "Cancel   ",
                                                        onPress: () => { },
                                                    },
                                                    {
                                                        text: "Delete",
                                                        onPress: () => { props.handleTimeStampDelete(timeStamp.id, props.subGoalData.id) },
                                                    },
                                                ])}
                                            />
                                        </>
                                        {/* ) : (
                                            <View >
                                                <View style={{ flexDirection: "row", marginLeft: 0 }}>
                                                    <Button
                                                        onPress={() => showMode("date")}
                                                        icon="calendar"
                                                    >
                                                        {datePickerData.toDateString().slice(0, -5)}
                                                    </Button>
                                                    <Button
                                                        style={{ marginLeft: -10 }}
                                                        onPress={() => showMode("time")}
                                                        icon="clock"
                                                    >
                                                        {timePickerData.toTimeString().slice(0, -12)}
                                                    </Button>
                                                </View>
                                                <View style={styles.editableContainer}>
                                                    <Button
                                                        mode='contained-tonal'
                                                        style={styles.saveBtn}
                                                        onPress={() => setEditableRowId(null)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        mode='contained-tonal'
                                                        style={styles.saveBtn}
                                                        onPress={() => console.log("TODO: API call of Edit")}
                                                    >
                                                        Save
                                                    </Button>
                                                </View>
                                                {isPickerVisible && (
                                                    <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={pickerMode === "date" ? datePickerData : timePickerData}
                                                        mode={pickerMode}
                                                        is24Hour={true}
                                                        display="default"
                                                        onChange={(event, selectedDate) => onPickerValueChange(event, selectedDate, pickerMode)}
                                                    />
                                                )}
                                            </View>
                                        )
                                    } */}
                                    </View>
                                    <Divider />
                                </View>
                            )
                        })}


                    </Card>
                </ScrollView>
            </BottomSheet>

        </Provider >
    )
}

export default IndividualGoal;

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        backgroundColor: "white",
        marginBottom: 1,
    },
    cartTitle: {
        marginBottom: -5,
        flexDirection: "row",
        alignItems: "center",
    },
    countText: {
        fontSize: 15,
        marginRight: 20,
        fontWeight: "bold"
    },
    plusOneButton: {
        margin: 10,
        borderRadius: 2,
        width: "30%",
        alignSelf: "center",
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 10,
        top: "0%"
    },
    bottomSheetContainer: {
        margin: 5,
        flexDirection: "row"
    },
    bottomSheetText: {
        height: 40,
        marginLeft: 5,
        paddingTop: 5,
        marginRight: "auto"
    },
    editableContainer: {
        flexDirection: "row",
        margin: 10,
    },
    saveBtn: {
        borderRadius: 5,
        marginLeft: 50,
    }
})