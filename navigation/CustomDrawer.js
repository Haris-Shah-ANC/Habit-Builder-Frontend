import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { customTheme } from '../utilities/theme';
import { useAuth } from '../screens/Authentication/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';

const CustomDrawer = (props) => {
    const { authState, clearLoginDetails } = useAuth();
    const { status, token, username, email, userId } = authState;

    console.log(status)
    return (
        <ScrollView style={{ marginBottom: 20 }}>
            <View style={styles.userInfoContainer}>
                <View style={styles.imageContainer}>
                    <Text style={styles.txtTitle}> HABIT BUILDER</Text>
                </View>
                {status === "true" ? (
                    <View>
                        {/* <Text style={styles.txtname}>{username}</Text> */}
                        <Text style={styles.txtemail}>{email}</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            props.nav.navigate("Login");
                        }}
                    >
                        <View>
                            <Text >Click here to Login</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            {status === "true" ? (
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            "Are you sure you want to Logout?",
                            "Press 'Cancel' to stay Logged In",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => { },
                                    style: "cancel",
                                },
                                {
                                    text: "Logout",
                                    onPress: () => { clearLoginDetails(); },
                                },
                            ]
                        );
                    }}
                >
                    <View style={styles.contentStyle}>
                        <Ionicons name="log-out" style={styles.iconStyle} />
                        <Text style={styles.textStyle}>Log Out</Text>
                    </View>
                    <Divider />
                    <Divider />
                </TouchableOpacity>
            ) : (
                null
            )}
        </ScrollView>
    )
}

export default CustomDrawer;


const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: customTheme.colors.drawerbg,
        alignItems: "center",
    },
    userInfoContainer: {
        backgroundColor: customTheme.colors.drawerbg,
        paddingTop: 70,
        paddingBottom: 15,
        marginBottom: 10,
        // height: 250,
    },
    contentStyle: {
        flexDirection: "row",
        paddingVertical: 15,
    },
    iconStyle: {
        marginLeft: 20,
        fontSize: 25,
        color: "black",
    },
    textStyle: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    txtname: {
        fontSize: 18,
        marginLeft: 15,
        color: "white",
        marginTop: 10,
    },
    txtTitle: {
        fontSize: 20,
        marginLeft: 15,
        color: "white",
        marginTop: 10,
        fontWeight: "bold"
    },
    txtemail: {
        fontSize: 15,
        marginLeft: 15,
        color: "white",
        marginTop: 10,
    },
});
