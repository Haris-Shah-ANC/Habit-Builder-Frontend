import { StyleSheet, Text, View } from "react-native";
import { getToken } from "../config/storageCOnfig,";
import { Button } from "react-native-paper";

export const RedStar = () => {
    return <Text style={{ color: "red" }}>*</Text>;
};

export const fetchToken = async () => {
    let token = await getToken();
    console.log("token", token);
    return token
}

export const CenterText = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
    }
})

export let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}