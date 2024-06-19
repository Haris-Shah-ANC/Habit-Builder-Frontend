import * as React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

const CreateUpdateGoal = () => {
    const [text, setText] = React.useState("");

    return (
        <View style={{paddingTop : 10}}>
            <TextInput
                label="Email"
                value={text}
                onChangeText={text => setText(text)}
            />
        </View>
    )
}

export default CreateUpdateGoal;
