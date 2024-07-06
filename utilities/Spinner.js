import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

const Spinner = (props) => {
    if (props.infinityScroll) {
        return (
            <ActivityIndicator
                style={styles.infinityScrollStyle}
                animating={true}
                color={"blue"}
                size={30}
            />
        );
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={"#f4511e"} size={30} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    infinityScrollStyle: {
        marginTop: 10,
        marginBottom: 10,
        // paddingVertical: 100,
    },
});

export default Spinner;
