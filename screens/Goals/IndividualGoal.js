import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../utilities/HeaderButtons';
import moment from 'moment';
import { Button, Card, Menu, Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const IndividualGoal = (props) => {
    // console.log("props in IndividualGoal", props.route.params.goalData);

    let startDate = moment(props.route.params.goalData.created_at);
    let endDate = moment(props.route.params.goalData.end_date);
    let subGoalsList = props.route.params.goalData.tasks

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

    return (
        <ScrollView>
            {subGoalsList.map(subGoal => (
                <SubGoalView subGoalData={subGoal} key={subGoal.id} />
            ))}
        </ScrollView>
    )
}

const SubGoalView = (props) => {
    console.log("SubGoal", props.subGoalData.id)

    const [isMenuVisible, setIsMenuVisible] = React.useState(false);
    let completedTimes = props.subGoalData.completed_times ? props.subGoalData.completed_times : 0
    console.log("isMenuVisible", isMenuVisible)
    const openMenu = () => setIsMenuVisible(true);
    const closeMenu = () => setIsMenuVisible(false);

    return (
        <Provider>
            <Card style={styles.cardContainer}>
                <View style={styles.cartTitle}>
                    <Card.Title title={props.subGoalData.taskname} style={{ marginRight: "auto" }} />
                    <Menu
                        style={{zIndex : 99999,backgroundColor :"black"}}
                        visible={isMenuVisible}
                        onDismiss={closeMenu}
                        anchor={
                            <Text style={{ marginLeft: "auto" }} onPress={openMenu}>
                                <Ionicons name="ellipsis-vertical" size={20} />
                            </Text>
                        }
                    >
                        <Menu.Item onPress={() => { closeMenu(); props.onEdit(props.subGoalData.id); }} title="Edit" />
                        <Menu.Item onPress={() => { closeMenu(); props.onDelete(props.subGoalData.id); }} title="Delete" />
                    </Menu>
                </View>
                <Card.Content>
                    <Text style={styles.countText}>
                        {`${completedTimes}/${props.subGoalData.times}`}
                    </Text>
                </Card.Content>

                <Button
                    mode="outlined"
                    style={styles.plusOneButton}
                >
                    +1
                </Button>
            </Card>
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
        zIndex : 1
    },
    cartTitle: {
        marginBottom: -5,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1,
    },
    countText: {
        fontSize: 15,
        zIndex: 0,
    },
    plusOneButton: {
        margin: 10,
        borderRadius: 2,
        width: "30%",
        alignSelf: "center",
    }
})