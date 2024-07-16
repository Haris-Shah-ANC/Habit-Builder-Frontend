import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Linking, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Card, Provider, TextInput as PaperTextInput, Button } from 'react-native-paper'
import { GoogleLogo } from '../../utilities/HeaderButtons'
import { Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { HOST } from '../../config/config'
import { loginUser } from './authNetworkCalls'
import { useAuth } from './AuthProvider'
import { setToken } from '../../config/storageCOnfig,'

const ConnectAccount = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRoute();

    const { setAuthState } = useAuth();

    const handleSubmit = async () => {
        if (!email, !password) {
            alert("Please Fill the required details")
            return
        }
        let payloadData = {
            username: email,
            email: email,
            password: password
        }
        // console.log("Login Payload", payloadData)
        loginUser(payloadData)
            .then((res) => {
                if (res.data.success !== true) {
                    Alert.alert("Login Failed", res.data.status ? res.data.status : "Please try again", [
                        {
                            text: "OK",
                            onPress: () => { },
                        },
                    ]);
                    // clearFormData();
                } else {
                    setAuthState({
                        token: res.data.token.access,
                    })
                    Linking.openURL(`${HOST}/google-login/`);
                }
            })
            .catch((err) => {
                Alert.alert("Some Error Occured", "Please try again", [
                    {
                        text: "OK",
                        onPress: () => { },
                    },
                ]);
                console.log("Error while Login", err)
            })

    };


    return (
        <Provider>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.connnectInfoContainer}>
                    <Ionicons name="information-circle-outline" size={16} style={{ marginTop: 10 }} />
                    <Text style={styles.connectInfoText}>
                        {` We've found an existing account with the email address associated with your social account.\n\n To link the two accounts,please login with the email and password associated with your existing account.`}
                    </Text>
                </View>
                <ScrollView
                    style={styles.boxContainer}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Card style={styles.card}>
                        <Card.Content>
                            <PaperTextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                mode="outlined"
                                label="Email"
                            />

                            <PaperTextInput
                                style={styles.input}
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                                mode="outlined"
                                label="password"
                            />

                            <Button mode="contained" style={styles.btnLoginup} onPress={handleSubmit}>
                                Connect
                            </Button>

                        </Card.Content>

                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        </Provider>
    )
}

export default ConnectAccount


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
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
    },
    btnLoginup: {
        marginTop: 5,
        borderRadius: 5,
    },
    btnGoogleLogin: {
        flex: 1,
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: "#dd4b39",
        paddingTop: 10,
    },
    card: {
        backgroundColor: "white",
    },
    signUp: {
        marginTop: 25,
    },
    widthStyle: {
        width: "80%",
        maxWidth: 390,
    },
    connnectInfoContainer: {
        marginHorizontal: 16,
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "#34aadc",
        borderColor: "#3498db",
        marginVertical: 13
    },
    connectInfoText: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontSize: 12
    }
})