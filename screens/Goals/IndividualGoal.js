import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton, { DeleteLogo } from '../../utilities/HeaderButtons';
import moment from 'moment';
import { Button, Card, Modal, Provider, Divider } from 'react-native-paper';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { deleteSpecificSubGoal, getAllTimeStamps, incrementSubGoalCount } from '../../NetworkCalls/networkCalls';
import { CenterText } from '../../utilities/utils';

const IndividualGoal = (props) => {
    // console.log("props in IndividualGoal", subGoalsList);

    const [isModalVisible, setIsModalVisible] = React.useState(false);

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

    const addSubGaolCount = (subGoalId) => {
        let currentTimestamp = moment().format('YYYY-MM-DD H:mm:ss');
        let payloadData = {
            timestamp: currentTimestamp
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
                }
            })
            .catch((err) => {
                console.log("Error while Incrementing SubGoal Count", err);
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
                        handleAddClick={(subGoalId) => addSubGaolCount(subGoalId)}
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
    let bottomSheet = React.useRef();
    let completedTimes = props.subGoalData.completed_times ? props.subGoalData.completed_times : 0
    let totalTimes = props.subGoalData.times;
    const [timeStampsList, setTimeStampsList] = React.useState(null);

    const fetchTimeStampList = (subGoalId) => {
        getAllTimeStamps(subGoalId)
            .then((res) => {
                let result = res.data;
                // console.log("result", result.taskcompleted);
                if (result.success === true) {
                    setTimeStampsList(result.taskcompleted);
                }
            })
            .catch((err) => {
                console.log("Error while fetching TimeStamps List", err)
            })
    }

    return (
        <Provider>
            <Card style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={() => { bottomSheet.current.show(); fetchTimeStampList(props.subGoalData.id) }}
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
                        onPress={() => props.handleAddClick(props.subGoalData.id)}
                    >
                        +1
                    </Button>
                ) :
                    (
                        <CenterText text={"Goal Completed"} />
                    )
                }
            </Card>

            <BottomSheet hasDraggableIcon ref={bottomSheet} height={300} style={{ position: "absolute", backgroundColor: "green" }} >
                <Card style={styles.cardContainer}>
                    <View style={styles.cartTitle}>
                        <Card.Title title={props.subGoalData.taskname} style={{ marginRight: "auto" }} />
                        <Text style={styles.countText}>
                            {`${completedTimes}/${props.subGoalData.times}`}
                        </Text>
                    </View>
                    {timeStampsList?.map((timeStamp) => {
                        // console.log(timeStamp)
                        return (
                            <View
                                key={timeStamp.id}
                            >
                                <Text>
                                    {moment(timeStamp.timestamp, "YYYY-MM-DDTH:mm:ss").format('MMM Do YY, h:mm a')}
                                </Text>
                                <Divider />
                            </View>

                        )
                    })}
                </Card>
            </BottomSheet>

        </Provider>
    )
}

// export const IndividualGoalScreenOptions = (props) => {
//     return {
//         headerTitle: props.route.params.goalData.topic_name,
//     }
// }

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
        marginRight: 10
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
})