import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton, { AddNewGoalButton, DeleteLogo } from '../utilities/HeaderButtons';
import { getLoginStatus } from '../config/storageCOnfig,';
import Login from './Authentication/Login';
import { Button, Card, Text } from 'react-native-paper';
import { deleteSpecificGoal, fetchAllGoals } from '../NetworkCalls/networkCalls';
import { ScrollView } from 'react-native-virtualized-view';
import moment from 'moment/moment';
import { useIsFocused } from '@react-navigation/native';
import { CenterText } from '../utilities/utils';

const HomePage = ({ route, navigation }) => {

    const [loginStatus, setLoginStatus] = React.useState(null);
    const isFocused = useIsFocused();

    const [goalsList, setGoalsList] = React.useState(
        [{ "created_at": "2024-06-25T10:11:53.313796Z", "duration_days": 44, "end_date": "2024-07-15", "id": 51, "is_completed": false, "modified_at": "2024-06-25T10:11:53.327026Z", "start_date": "2024-06-01", "tasks": [[Object], [Object], [Object], [Object], [Object], [Object]], "topic_name": "improve vocabulary", "user_id_id": 74 }, { "created_at": "2024-06-26T14:03:34.233475Z", "duration_days": 136, "end_date": "2024-10-15", "id": 75, "is_completed": false, "modified_at": "2024-06-26T14:03:34.246705Z", "start_date": "2024-06-01", "tasks": [[Object], [Object], [Object], [Object], [Object], [Object]], "topic_name": "Healthy Diet", "user_id_id": 74 }, { "created_at": "2024-06-26T14:22:33.860446Z", "duration_days": 136, "end_date": "2024-10-15", "id": 76, "is_completed": false, "modified_at": "2024-06-26T14:22:33.875656Z", "start_date": "2024-06-01", "tasks": [], "topic_name": "Healthy Diet", "user_id_id": 74 }, { "created_at": "2024-06-26T14:22:34.714685Z", "duration_days": 136, "end_date": "2024-10-15", "id": 77, "is_completed": false, "modified_at": "2024-06-26T14:22:34.727156Z", "start_date": "2024-06-01", "tasks": [], "topic_name": "Healthy Diet", "user_id_id": 74 }, { "created_at": "2024-06-26T14:22:35.535821Z", "duration_days": 136, "end_date": "2024-10-15", "id": 78, "is_completed": false, "modified_at": "2024-06-26T14:22:35.548575Z", "start_date": "2024-06-01", "tasks": [], "topic_name": "Healthy Diet", "user_id_id": 74 }]
    );

    const title = route.params;

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
        fetchAllGoals()
            .then((res) => {
                let result = res.data.data.topics;
                // console.log("result", result);
                setGoalsList(result);
            })
            .catch((err) => {
                console.log("Error while fetching Goal list", err);
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
        if (isFocused) {
            fetchGoalsList()
        }
    }, [isFocused])

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
            {(goalsList && goalsList.length > 0) ?
                (
                    <ScrollView>
                        {goalsList?.map(goal => (
                            <CardView
                                key={goal.id}
                                goal={goal}
                                navigation={navigation}
                                handleDelete={(goalId) => deleteGoal(goalId)}
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

    let date = moment(props.goal.created_at)
    let goalData = props.goal
    // console.log("goalData", goalData.id)

    return (

        <Card style={styles.cardContainer} >
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("Goal", {
                        goalData
                    })
                }}
            >
                <View style={styles.cardContent}>
                    <Card.Title title={props.goal.topic_name} style={{ marginRight: "auto" }} />
                </View>
                <Card.Content style={styles.cardContent}>
                    <Text variant="bodyLarge" style={{ marginRight: "auto" }}>
                        {date.format('DD MMM YYYY')}
                    </Text>
                    <Text variant="bodyLarge" style={{ marginLeft: "auto" }}>
                        {date.fromNow()}
                    </Text>
                </Card.Content>
            </TouchableOpacity>
            <Card.Actions style={styles.cardFooter}>
                <Button style={styles.editBtn} onPress={""}>Edit</Button>
                <Button style={styles.deleteBtn} onPress={() => Alert.alert("Are you sure you want delete this Goal?", "Press cancel to go back", [
                    {
                        text: "Cancel   ",
                        onPress: () => { },
                    },
                    {
                        text: "Delete",
                        onPress: () => { props.handleDelete(goalData.id) },
                    },
                ])}>
                    Delete
                </Button>
            </Card.Actions>
        </Card>
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
})
