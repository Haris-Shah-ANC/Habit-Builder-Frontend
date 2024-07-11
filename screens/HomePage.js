import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { HeaderButtons, } from "react-navigation-header-buttons";
import CustomHeaderButton, { AddNewGoalButton, } from '../utilities/HeaderButtons';
import { Button, Card, Provider, Text } from 'react-native-paper';
import { deleteSpecificGoal, fetchAllGoals } from '../NetworkCalls/networkCalls';
import { ScrollView } from 'react-native-virtualized-view';
import moment from 'moment/moment';
import { useIsFocused } from '@react-navigation/native';
import { CenterText } from '../utilities/utils';
import EditRecreateGoal from './Goals/EditRecreateGoal';
import Spinner from '../utilities/Spinner';
import { useAuth } from './Authentication/AuthProvider';


const HomePage = ({ route, navigation }) => {

    const isScreenFocused = useIsFocused();

    const [goalsList, setGoalsList] = React.useState(null);
    const [spinner, setSpinner] = React.useState(true);

    const { authState } = useAuth();
    const { token } = authState;

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <AddNewGoalButton
                        onPressHandler={() => {
                            navigation.navigate('Add Goal')
                        }}
                    />
                </HeaderButtons>
            ),
        })
    })

    const fetchGoalsList = () => {
        // console.log("fetchGoalsList")
        setSpinner(true);
        fetchAllGoals(token)
            .then((res) => {
                let result = res.data.data.topics;
                // console.log("result", result);
                setGoalsList(result);
                setSpinner(false);
            })
            .catch((err) => {
                console.log("Error while fetching Goal list", err);
                setSpinner(false);
            })
    }

    const deleteGoal = (goalId) => {
        deleteSpecificGoal(goalId)
            .then((res) => {
                let result = res.data;
                if (result.success === true) {
                    let newGoallist = goalsList?.filter((goal) => {
                        return goal.id !== goalId
                    })
                    Alert.alert("Success", "Goal deleted Successfully", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                    setGoalsList(newGoallist);
                } else {
                    Alert.alert("Operation Failed", "Please try again", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                }
            })
            .catch((err) => {
                console.log("Error while deleting Goal", err)
            })
    }

    React.useEffect(() => {
        if (token) {
            fetchGoalsList()
        }
    }, [isScreenFocused, token])

    // const checkLoginStatus = async () => {
    //     const isLoggedIn = await getLoginStatus();
    //     // console.log("loginStatus", isLoggedIn);
    //     setLoginStatus(isLoggedIn)
    // }

    // React.useEffect(() => {
    //     checkLoginStatus()
    // }, [])

    // if (!loginStatus) return <Login />

    // console.log("GoalList", goalsList.data.topics)

    return (
        <>
            {spinner ? (
                <Spinner />
            ) : (goalsList && goalsList.length > 0) ?
                (
                    <ScrollView>
                        {goalsList?.map(goal => (
                            <CardView
                                key={goal.id}
                                goal={goal}
                                navigation={navigation}
                                handleDelete={(goalId) => deleteGoal(goalId)}
                                refreshPage={() => fetchGoalsList()}
                            />
                        ))}
                    </ScrollView>
                ) :
                (
                    <CenterText text={"No Goals Found"} />
                )
            }
        </>
    )
}

const CardView = (props) => {

    let created_at = moment(props.goal.created_at)
    let start_date = moment(props.goal.start_date)
    let end_date = moment(props.goal.end_date)
    let goalData = props.goal
    const [editableGoalId, setEditableGoalId] = React.useState(null);
    const [actionType, setActionType] = React.useState("edit");
    const isExpired = end_date.isBefore(moment());

    // console.log("goalData:", isExpired);

    return (
        <Provider >
            {editableGoalId !== goalData.id ? (
                <Card style={[styles.cardContainer, (isExpired) && styles.expiredCard]}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("Goal", {
                                goalData,
                                isExpired
                            })
                        }}
                    >
                        <View style={styles.cardContent}>
                            <Card.Title title={props.goal.topic_name} style={{ marginRight: "auto" }} />
                        </View>
                        <Card.Content style={styles.cardContent}>
                            <Text variant="bodyLarge" style={{ marginRight: "auto", color: (isExpired) && "red" }}>
                                {end_date.format('DD MMM YYYY')}
                            </Text>
                            <Text variant="bodyLarge" style={{ marginLeft: "auto", color: (isExpired) && "red" }}>
                                {(isExpired) ? "Deadline Expired" : created_at.fromNow()}
                            </Text>
                        </Card.Content>
                    </TouchableOpacity>
                    {(isExpired) ? (
                        <Card.Actions style={styles.cardFooter}>
                            <Button
                                style={styles.recreateBtn}
                                onPress={() => { setEditableGoalId(goalData.id); setActionType("recreate") }}
                            >
                                Recreate Timeline
                            </Button>
                        </Card.Actions>
                    ) : (
                        <Card.Actions style={styles.cardFooter}>
                            <Button
                                style={styles.editBtn}
                                onPress={() => { setEditableGoalId(goalData.id); setActionType("edit") }}
                            >
                                Edit
                            </Button>
                            <Button
                                style={styles.deleteBtn}
                                onPress={() => Alert.alert("Are you sure you want delete this Goal?", "Press cancel to go back", [
                                    {
                                        text: "Cancel   ",
                                        onPress: () => { },
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => { props.handleDelete(goalData.id) },
                                    },
                                ])}
                            >
                                Delete
                            </Button>
                        </Card.Actions>
                    )}
                </Card>
            ) : (
                <EditRecreateGoal
                    closeEditMode={() => setEditableGoalId(null)}
                    goalData={goalData}
                    refreshPage={() => props.refreshPage()}
                    actionType={actionType}
                />
            )}
        </Provider>
    )
}

export default HomePage;

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        backgroundColor: "white",
        marginBottom: 1
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardFooter: {
        width: "100%",
        marginTop: 10,
        gap: 5
    },
    editBtn: {
        width: "40%",
        marginRight: "auto",
        borderRadius: 5,
    },
    deleteBtn: {
        width: "40%",
        marginRight: "auto",
        borderRadius: 5,
        backgroundColor: "#dd4b39"
    },
    recreateBtn: {
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: "white",
        marginRight: "20%",
        alignSelf: "center"
    },
    expiredCard: {
        backgroundColor: "#ffe6e6",
        borderWidth: 1,
        borderColor: "#ff6666",
    },
})
