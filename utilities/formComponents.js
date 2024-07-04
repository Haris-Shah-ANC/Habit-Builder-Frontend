import { Button, TextInput } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import { createNewUnit, fetchUserDefinedUnits } from "../NetworkCalls/networkCalls";
import { StyleSheet, View } from "react-native";
import { useState, useRef, useEffect } from "react";
import { capitalizeFirstLetter } from "./utils";

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

export const CustomDropDownPicker = (props) => {

    const [unitList, setUnitList] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [value, setValue] = useState(null);
    const [newItemText, setNewItemText] = useState('');
    const hasFeatchedUnits = useRef(false);
    const [showAddNew, setShowAddNew] = useState(false);

    // console.log("value", value);

    const getUnitsList = () => {
        if (hasFeatchedUnits.current) return;
        fetchUserDefinedUnits()
            .then((res) => {
                let result = res.data;
                console.log(result)
                setUnitList([{ label: 'Add New Unit', value: 'add_new' }, ...result.data])
                hasFeatchedUnits.current = true;
            })
            .catch((err) => {
                console.log("Error while Fetching Unit List", err);
                hasFeatchedUnits.current = true;
            })
    }

    const handleValueChange = (val) => {
        if (val === 'add_new') {
            setOpenDropDown(false);
            setShowAddNew(true);
            setValue(null);
        } else {
            setValue(val);
            props.unitValue(val);
            setShowAddNew(false);
        }
    };

    const addNewItem = (itemText) => {
        console.log("itemText", itemText)
        if (itemText.trim() !== '') {
            let payloadData = { unit: itemText }
            createNewUnit(payloadData)
                .then((res) => {
                    let result = res.data.result;
                    const newItem = { label: capitalizeFirstLetter(result.unit), value: result.unit.toLowerCase() };
                    setUnitList((prevItems) => [
                        ...prevItems.filter((item) => item.value !== 'add_new'),
                        newItem,
                        { label: 'Add New', value: 'add_new' },
                    ]);
                    setValue(newItem.value);
                    setNewItemText('');
                    setShowAddNew(false);
                    props.unitValue(newItem.value);
                })
                .catch((err) => {
                    console.log("Error while creating Unit", err);
                })
        }
        else {
            alert("Please Enter Unit First")
        }
    };

    useEffect(() => {
        getUnitsList();
    }, [])

    return (
        <>
            {(unitList && unitList.length) > 0 &&
                <DropDownPicker
                    style={styles.dropdown}
                    open={openDropDown}
                    value={value}
                    items={unitList}
                    setOpen={setOpenDropDown}
                    setValue={setValue}
                    setItems={setUnitList}
                    onSelectItem={(item) => handleValueChange(item.value)}
                    listMode="SCROLLVIEW"
                />
            }
            {showAddNew && (
                <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: "center", padding: 5 }}>
                    <TextInput
                        value={newItemText}
                        onChangeText={setNewItemText}
                        label="Enter new unit"
                        style={{ height: 45, width: "60%", marginRight: "auto" }}
                        mode="outlined"
                    />
                    <Button
                        onPress={() => addNewItem(newItemText)}
                        mode="contained-tonal"
                        style={{ width: "30%", height: 45 }}
                    >
                        Add
                    </Button>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        marginBottom: 10
    }
})