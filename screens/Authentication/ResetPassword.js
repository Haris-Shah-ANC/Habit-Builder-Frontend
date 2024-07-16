import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button, Card, TextInput as PaperTextInput } from 'react-native-paper';
import { resetPassword } from './authNetworkCalls';

const ResetPassword = () => {

    const route = useRoute();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [urlToken, setUrlToken] = useState("");
    const [urlId, setUrlId] = useState("");

    const onSubmitHandler = () => {
        if (password !== confirmPassword) {
            alert("Password and confrim password do not match")
            return
        }
        const payloadData = {
            url: "URL TOKEN HERE",
            id: "URL ID HERE",
            password: password
        }

        resetPassword(payloadData)
            .then((res) => {
                console.log("res", res.data);
                // TODO : on api success navigate to Login Screen
            })
            .catch((err) => {
                console.log("Error while Resetting Password", res);
            })

    }

    useEffect(() => {
        // console.log("token==>", route.path)
        if (route?.params?.token) {

        }
    }, [route.params?.token]);


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
        alignItems: "center"
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
