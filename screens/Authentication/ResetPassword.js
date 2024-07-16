import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import { Button, Card, TextInput as PaperTextInput } from 'react-native-paper';
import { resetPassword } from './authNetworkCalls';

const ResetPassword = (props) => {

    const [password, setPassword] = useState("H@ris123");
    const [confirmPassword, setConfirmPassword] = useState("H@ris123");
    const route = useRoute();

    const onSubmitHandler = () => {
        if (password !== confirmPassword) {
            alert("Password and confrim password do not match")
            return
        }
        const payloadData = {
            token: route.params?.token,
            new_password: password
        }

        resetPassword(payloadData)
            .then((res) => {
                // console.log("res", res.data);
                if (res.data.success !== true) {
                    Alert.alert("Reset Password Failed!", res.data.status ? res.data.status : "Please try again", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                } else {
                    console.log("Password Updated Successfully!");
                    Alert.alert("Success!", res.data.status ? res.data.status : "Password Updated Successfully", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                    props.navigation.navigate('Login');
                }
            })
            .catch((err) => {
                console.log("Error while Resetting Password", err);
            })

    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Reset Password</Text>
            <Card style={styles.boxContainer}>
                <Card.Content>
                    <Text style={styles.label}>Create new Password:</Text>
                    <PaperTextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        label="Enter password"
                        secureTextEntry
                    />

                    <Text style={styles.label}>Confirm Password:</Text>
                    <PaperTextInput
                        style={styles.input}
                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                        mode="outlined"
                        label="Re-enter password"
                    />
                </Card.Content>

                <Button mode="contained" style={styles.btnSendEmail} onPress={onSubmitHandler}>
                    Reset Password
                </Button>
            </Card>
        </View>
    )
}

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        marginVertical: "25%"
    },
    boxContainer: {
        width: "100%",
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'heavy',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        marginVertical: 5,
        fontWeight: "500"
    },
    btnSendEmail: {
        marginVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10
    },
})
