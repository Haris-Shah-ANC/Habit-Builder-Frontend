import { TextInput } from "react-native-paper";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

export const CustomTextInput = (props) => {
    console.log(props.onChangeText);
    return (
        <TextInput
            style={props.style}
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            mode={props.mode}
        />
    )
}


const dropdownData = [
    { label: "kg", value: "kg" },
    { label: "nos", value: "nos" },
    { label: "hours", value: "hours" }
]

const renderItem = (item) => {
    return (
        <View>
            <Text style={styles.textItem}>{item.label}</Text>
            {item.value === unit && (
                <Item
                    title="selected"
                    iconName="checkmark-outline"
                    color='black'
                    size={10}
                />
            )}
        </View>
    )
}