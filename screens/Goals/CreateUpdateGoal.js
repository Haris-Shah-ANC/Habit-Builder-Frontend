import * as React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const CreateUpdateGoal = () => {
    const [text, setText] = React.useState("");

    return (
        <View style={{ paddingTop: 10,padding : 10 }}>
            <Text style={{ paddingLeft: 10 }}>Name Your List</Text>
            <TextInput
                label=""
                value={text}
                onChangeText={text => setText(text)}
            />
        </View>
    )
}

export default CreateUpdateGoal;
