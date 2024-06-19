import * as React from 'react';
import { Text, View, Button } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton, { AddNewGoalButton } from '../utilities/HeaderButtons';

const HomePage = ({ route, navigation }) => {

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

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    )
}

export default HomePage;
