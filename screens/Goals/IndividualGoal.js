import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton, { DeleteLogo } from '../../utilities/HeaderButtons';
import moment from 'moment';
import { Button, Card, Menu, Provider } from 'react-native-paper';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { deleteSpecificSubGoal } from '../../NetworkCalls/networkCalls';

const IndividualGoal = (props) => {
    // console.log("props in IndividualGoal", props.route.params.goalData);

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
                // console.log("result:", result);
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

    return (
        <ScrollView>
            {subGoalsList.map(subGoal => (
                <SubGoalView
                    subGoalData={subGoal}
                    key={subGoal.id}
                    handleDelete={(subGoalId) => deleteSubGoal(subGoalId)}
                />
            ))}
        </ScrollView>
    )
}

const SubGoalView = (props) => {
    // console.log("SubGoal", props.subGoalData.id)

    const bottomSheet = React.useRef();
    let completedTimes = props.subGoalData.completed_times ? props.subGoalData.completed_times : 0


    return (
        <Provider>
            <Card style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={() => bottomSheet.current.show()}
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
                            {`${completedTimes}/${props.subGoalData.times}`}
                        </Text>
                    </Card.Content>
                </TouchableOpacity>
                <Button
                    mode="outlined"
                    style={styles.plusOneButton}
                >
                    +1
                </Button>
            </Card>

            <BottomSheet hasDraggableIcon ref={bottomSheet} height={300} style={{ position: "absolute", backgroundColor: "green" }} >
                <Card style={styles.cardContainer}>
                    <View style={styles.cartTitle}>

                        <Card.Title title={props.subGoalData.taskname} style={{ marginRight: "auto" }} />

                        <Card.Content>
                            <Text style={styles.countText}>
                                {`${completedTimes}/${props.subGoalData.times}`}
                            </Text>
                        </Card.Content>
                    </View>
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
    },
    plusOneButton: {
        margin: 10,
        borderRadius: 2,
        width: "30%",
        alignSelf: "center",
    }
})