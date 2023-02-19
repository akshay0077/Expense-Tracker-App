import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity, Dimensions, View
} from "react-native";
import { TextInput, Modal, Divider, Button } from 'react-native-paper';

import {
  BorderlessButton,
} from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";

import theme, { Box, Text } from "../../components/theme";
import { BackArrow } from "../Svgs";
import { addTransaction } from "../../../store/actions/transactionActions";
import { useDispatch } from "react-redux";

/* Dimension */
const { width, height } = Dimensions.get("window");
import { tw } from "react-native-tailwindcss";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 3,
    paddingTop: 40,
    padding: theme.spacing.l,
    bottom: 0,
  },
});

const Add = ({ navigation }) => {
  const [visible, setVisible] = React.useState(true);
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [reciver, setreciver] = useState("");
  const titleRef = useRef(null);

  const onPop = () => {
    navigation.goBack()
    //navigation.dispatch(popAction);
  };

  //Functions
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false)
  };

  const onSubmit = (Action) => {
    setVisible(false);
    const transaction = {
      price: Action == "Debit" ? -price : price,
      reciver,
      title,
    };

    if (!price || !title || !reciver) return alert("Details Empty");

    dispatch(addTransaction(transaction));
    setPrice("");
    setreciver("");
    setTitle("");
    navigate("Transactions");
  };
  //Form Handling
  return (
    <Box padding="l" flex={1}>
      <Box flexDirection="row" alignItems="center" paddingTop="l">
        <TouchableOpacity onPress={onPop}>
          <Box>
            <BackArrow />
          </Box>
        </TouchableOpacity>

        <Text
          variant="title1"
          color="primary2"
          style={{ marginLeft: 30, fontSize: 18 }}
        >
          Add Amount
        </Text>
      </Box>
      <Button onPress={() => setVisible(true)}>Add New Entry</Button>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[tw.bgWhite, tw.m3, tw.p4, tw.h100]}>
        <Text style={[tw.text3xl, tw.fontBold, tw.mT6, tw.mB1]}>New Entry</Text>
        <Divider />
        <TextInput
          onChangeText={(price) => setPrice(price)}
          placeholder='Amount' mode='outlined'
          keyboardType="number-pad"
          autoFocus={true}
          onSubmitEditing={() => titleRef.current.focus()}
          defaultValue={price}
        />
        <TextInput
          placeholder='reciver' mode='outlined'
          onChangeText={(reciver) => setreciver(reciver)}
          onSubmitEditing={() => titleRef.current.focus()}
          defaultValue={reciver}

        />
        <TextInput
          placeholder='Detail' mode='outlined'
          defaultValue={title}
          onChangeText={(title) => setTitle(title)}
        />
        <View style={[tw.flexRow, tw.justifyBetween, tw.mT5]}>
          <TouchableOpacity onPress={() => onSubmit("Credit")} style={[tw.p4, tw.bgGreen600, tw.pL10, tw.pR10, tw.rounded]}><Text style={[tw.fontBold, tw.textWhite, { letterSpacing: 1, fontSize: 18 }]}>Crebit</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onSubmit("Debit")} style={[tw.p4, tw.bgRed600, tw.pL10, tw.pR10, tw.rounded]}><Text style={[tw.fontBold, tw.textWhite, { letterSpacing: 1, fontSize: 18 }]}>Debit</Text></TouchableOpacity>
        </View>
      </Modal>
    </Box>
  );
};

export default Add;
