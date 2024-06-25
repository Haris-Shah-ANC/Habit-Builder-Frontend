import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton, { AddNewGoalButton, DeleteLogo } from '../utilities/HeaderButtons';
import { getLoginStatus } from '../config/storageCOnfig,';
import Login from './Authentication/Login';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { fetchAllGoals } from '../NetworkCalls/networkCalls';
import { ScrollView } from 'react-native-virtualized-view';
import moment from 'moment/moment';

const HomePage = ({ route, navigation }) => {

    const [loginStatus, setLoginStatus] = React.useState(null);

    const [goalsList, setGoalsList] = React.useState(
        {
            "success": true,
            "data":
            {
                "userdata": {
                    "id": 2,
                    "last_login": "2024-06-21T11:11:13.977581Z",
                    "email": "anshul2@gmail.com",
                    "name": null,
                    "first_name": null,
                    "last_name": null,
                    "date_of_birth": null,
                    "city": null,
                    "units": [
                        "number",
                        "min/hour"
                    ]
                },
                "topics": [
                    {
                        "id": 18,
                        "user_id_id": 2,
                        "topic_name": "Healthy Diet abc",
                        "start_date": "2024-06-01",
                        "end_date": "2025-12-15",
                        "duration_days": 562,
                        "created_at": "2024-06-20T14:29:02.294517Z",
                        "modified_at": "2024-06-20T14:29:02.307501Z",
                        "tasks": [
                            {
                                "id": 26,
                                "taskname": "Bhakri",
                                "topic_id_id": 18,
                                "user_id_id": 2,
                                "times": 3.0,
                                "system_defined_unit": "number",
                                "user_defined_unit": null,
                                "completed_times": null,
                                "created_at": "2024-06-20T14:29:02.311800Z",
                                "modified_at": "2024-06-20T14:29:02.314290Z"
                            },
                            {
                                "id": 27,
                                "taskname": "Guavas",
                                "topic_id_id": 18,
                                "user_id_id": 2,
                                "times": 30.0,
                                "system_defined_unit": null,
                                "user_defined_unit": "number",
                                "completed_times": null,
                                "created_at": "2024-06-20T14:29:02.317165Z",
                                "modified_at": "2024-06-20T14:29:02.319529Z"
                            },
                            {
                                "id": 28,
                                "taskname": "Bhakri",
                                "topic_id_id": 18,
                                "user_id_id": 2,
                                "times": 3.0,
                                "system_defined_unit": "nos",
                                "user_defined_unit": null,
                                "completed_times": null,
                                "created_at": "2024-06-21T06:16:00.086642Z",
                                "modified_at": "2024-06-21T06:16:00.089742Z"
                            }
                        ]
                    },
                    {
                        "id": 19,
                        "user_id_id": 2,
                        "topic_name": "Healthy Diet abc",
                        "start_date": "2024-06-01",
                        "end_date": "2025-12-15",
                        "duration_days": 562,
                        "created_at": "2024-06-21T06:16:00.076717Z",
                        "modified_at": "2024-06-21T06:16:00.080252Z",
                        "tasks": []
                    },
                    {
                        "id": 20,
                        "user_id_id": 2,
                        "topic_name": "Healthy Diet",
                        "start_date": "2024-06-01",
                        "end_date": "2024-07-15",
                        "duration_days": 44,
                        "created_at": "2024-06-21T06:33:17.078534Z",
                        "modified_at": "2024-06-21T06:33:17.081524Z",
                        "tasks": [
                            {
                                "id": 30,
                                "taskname": "Eating Rice",
                                "topic_id_id": 20,
                                "user_id_id": 2,
                                "times": 15.0,
                                "system_defined_unit": "nos",
                                "user_defined_unit": null,
                                "completed_times": null,
                                "created_at": "2024-06-21T06:33:17.088455Z",
                                "modified_at": "2024-06-21T06:33:17.092117Z"
                            },
                            {
                                "id": 31,
                                "taskname": "Apples",
                                "topic_id_id": 20,
                                "user_id_id": 2,
                                "times": 30.0,
                                "system_defined_unit": null,
                                "user_defined_unit": "number",
                                "completed_times": null,
                                "created_at": "2024-06-21T06:33:17.095663Z",
                                "modified_at": "2024-06-21T06:33:17.097943Z"
                            }
                        ]
                    },
                    {
                        "id": 21,
                        "user_id_id": 2,
                        "topic_name": "Healthy Diet",
                        "start_date": "2024-06-01",
                        "end_date": "2024-07-15",
                        "duration_days": 44,
                        "created_at": "2024-06-21T06:37:10.378271Z",
                        "modified_at": "2024-06-21T06:37:10.390962Z",
                        "tasks": []
                    },
                    {
                        "id": 24,
                        "user_id_id": 2,
                        "topic_name": "Get Healthy",
                        "start_date": "2024-06-21",
                        "end_date": "2024-07-31",
                        "duration_days": 40,
                        "created_at": "2024-06-21T06:58:38.680218Z",
                        "modified_at": "2024-06-21T06:58:38.692541Z",
                        "tasks": [
                            {
                                "id": 38,
                                "taskname": "Eat Apples",
                                "topic_id_id": 24,
                                "user_id_id": 2,
                                "times": 10.0,
                                "system_defined_unit": "nos",
                                "user_defined_unit": null,
                                "completed_times": null,
                                "created_at": "2024-06-21T06:58:38.698787Z",
                                "modified_at": "2024-06-21T06:58:38.701817Z"
                            },
                            {
                                "id": 39,
                                "taskname": "Running",
                                "topic_id_id": 24,
                                "user_id_id": 2,
                                "times": 10.0,
                                "system_defined_unit": "kms",
                                "user_defined_unit": null,
                                "completed_times": null,
                                "created_at": "2024-06-21T06:58:38.705128Z",
                                "modified_at": "2024-06-21T06:58:38.707408Z"
                            }
                        ]
                    },
                    {
                        "id": 31,
                        "user_id_id": 2,
                        "topic_name": "Healthy Diet abc",
                        "start_date": "2024-06-01",
                        "end_date": "2025-12-15",
                        "duration_days": 562,
                        "created_at": "2024-06-21T07:03:59.779964Z",
                        "modified_at": "2024-06-21T07:03:59.792578Z",
                        "tasks": []
                    },
                    {
                        "id": 35,
                        "user_id_id": 2,
                        "topic_name": "Improve English",
                        "start_date": "2024-06-21",
                        "end_date": "2024-07-31",
                        "duration_days": 40,
                        "created_at": "2024-06-21T07:19:02.619727Z",
                        "modified_at": "2024-06-21T07:19:02.633243Z",
                        "tasks": [
                            {
                                "id": 54,
                                "taskname": "Read book",
                                "topic_id_id": 35,
                                "user_id_id": 2,
                                "times": 15.0,
                                "system_defined_unit": "Pages",
                                "user_defined_unit": null,
                                "completed_times": null,
                                "created_at": "2024-06-21T07:19:02.639463Z",
                                "modified_at": "2024-06-21T07:19:02.643353Z"
                            }
                        ]
                    }
                ]
            }
        }
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
                let result = res.data
                console.log("result", result.data.topics);
                setGoalsList(result);
            })
            .catch((err) => {
                console.log("Error while fetching Goal list", err);
            })
    }

    React.useEffect(() => {
        fetchGoalsList()
    }, [])

    // const checkLoginStatus = async () => {
    //     const isLoggedIn = await getLoginStatus();
    //     // console.log("loginStatus", isLoggedIn);
    //     setLoginStatus(isLoggedIn)
    // }

    // React.useEffect(() => {
    //     checkLoginStatus()
    // }, [])

    // if (!loginStatus) return <Login />

    console.log("GoalList", goalsList.data.topics)

    return (
        <ScrollView>
            {goalsList?.data?.topics?.map(goal => (
                <CardView key={goal.id} goal={goal} navigation={navigation} />
            ))}
        </ScrollView>
    )
}

const CardView = (props) => {
    let date = moment(props.goal.created_at)

    return (

        <Card style={styles.cardContainer} >
            <TouchableOpacity >
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
                <Button style={styles.editBtn}>Edit</Button>
                <Button style={styles.deleteBtn}>Delete</Button>
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
        marginTop: 10
    },
    editBtn: {
        width: "50%",
        marginRight: "auto",
    },
    deleteBtn: {
        width: "50%",
        marginRight: "auto"
    }
})
