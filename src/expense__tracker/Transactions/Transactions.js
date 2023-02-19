import React from "react";
import { ImageBackground, SectionList, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import Animated from "react-native-reanimated";
import { useValue, withTransition } from "react-native-redash";
import theme, { Box, Text } from "../../components/theme";
import { Chart, AddIcon, Delete } from "../Svgs";

export const moneySign = "₹";

/* Add Transaction Component */
import Expense from "./Expense";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../../store/actions/transactionActions";
import Top from "./Top";
import { tw } from "react-native-tailwindcss";
import { StackActions } from "@react-navigation/native";

const Transactions = ({ navigation }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();

  const active = new Animated.Value(0);
  const transition = withTransition(active, { duration: 200 });

  const onNavigate = () => {
    navigate("AddTransaction");
  };

  const onDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const { transactions } = useSelector((state) => state.trs);

  const DATA = Object.values(
    transactions.reduce((acc, item) => {

      if (!acc[item.addedtime])
        acc[item.addedtime] = {
          title: item.addedtime,
          data: [],
          price: item.price,
          reciver: item.reciver,
        };

      acc[item.addedtime].data.push(item);
      return acc;
    }, {})
  );

  /* Price calculations */

  const allDates = transactions
    .map(({ addedtime }) => addedtime)
    .filter(function (value, index, array) {
      return array.indexOf(value) == index;
    });

  const Prices = ({ time }) => {
    const prices = transactions
      .filter(({ addedtime }) => addedtime == time)
      .map(({ price }) => {
        return price;
      });
    const sum = eval(prices.join("+"));

    return (
      <Text color="silver1">{sum > 0 ? `₹ ${sum}` : `- ₹ ${Math.abs(sum)}`}</Text>
    );
  };

  const renderHeader = ({ section: { data } }) => {
    return (
      <Box
        paddingHorizontal="m"
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="silver"
        paddingBottom="s"
        paddingTop="s"
        marginTop="m"
        borderTopRightRadius="m"
        borderTopLeftRadius="m"
      >

        <Text color="silver1" style={[tw.textShadow]}>
          {moment(data[0].addedtime, "x").format("DD MMM YYYY")}
        </Text>
        <Prices time={data[0].addedtime} />
      </Box>
    );
  };

  const renderFooter = () => {
    return (
      <Box
        paddingHorizontal="m"
        backgroundColor="white"
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="silver"
        paddingBottom="s"
        borderBottomRightRadius="m"
        borderBottomLeftRadius="m"
      ></Box>
    );
  };
  return (

    <ImageBackground
      source={{ uri: "data:image/png;base64,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" }}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <Top />

      <Box
        flex={1}
        paddingTop="m"
      >
        <SectionList
          style={[tw.flex, tw.shadowLg, { paddingHorizontal: 10, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: "rgba(255,255,255,.9)" }]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            const index = item.id;
            return (

              // <Animated.View
              //   style={{ borderRadius: 20, backgroundColor: "red" }}
              // >
              //   <Box
              //     overflow="hidden"
              //     borderBottomWidth={1}
              //     borderBottomColor="silver"
              //     height={50}
              //     position="relative"
              //     backgrjoundColor="white"
              //   >
              //     <Animated.View
              //       style={{
              //         fontSize: 12,
              //         color: "white",
              //         fontWeight: "900",
              //         position: "absolute",
              //         height: 50,
              //         width: "14%",
              //         right: -20,
              //         alignItems: "center",
              //         flexDirection: "row",
              //         justifyContent: "center",
              //         backgroundColor: "white",
              //       }}
              //     >
              //       <Text>
              //         <Delete />
              //       </Text>
              //     </Animated.View>
              //     <Animated.View style={{ backgroundColor: "white" }}>
              //       <Expense
              //         onTap={() => {
              //           active.setValue(index);
              //         }}
              //         {...{ transition, index, onDelete, item, allDates }}
              //       >
              //         <Box
              //           overflow="hidden"
              //           paddingHorizontal="m"
              //           borderBottomWidth={1}
              //           borderBottomColor="silver"
              //           height={50}
              //           position="relative"
              //           backgroundColor="white"
              //         >
              //           <View style={[StyleSheet.absoluteFill, {}]}>
              //             <Animated.View
              //               style={{
              //                 justifyContent: "space-between",
              //                 flexDirection: "row",
              //                 alignItems: "center",
              //                 height: 50,
              //                 paddingHorizontal: theme.spacing.m,
              //               }}
              //             ></Animated.View>
              //           </View>
              //         </Box>
              //       </Expense>
              //     </Animated.View>
              //   </Box>
              // </Animated.View>
              <>
                <TouchableOpacity style={[tw.bgWhite, tw.shadowLg, tw.p4, tw.flexRow, tw.justifyBetween, tw.h20, { borderRadius: 10, marginBottom: 5 }]}>
                  <View style={[tw.flexRow]}>
                    <Image source={require('../../../assets/gamer.png')} style={[tw.w12, tw.h12, tw.mR5]} />
                    <View>
                      <Text style={[tw.fontBold, { fontSize: 16 }]}>{item.reciver}</Text>
                      <Text style={[{ fontStyle: "italic" }, tw.textGray800]}>{item.title}</Text>
                    </View>
                  </View>
                  <View style={[tw.p3]}>
                    <Text style={[item.price >= 0 ? tw.textGreen700 : tw.textRed700, tw.fontBold, { fontSize: 16 }]}>₹{item.price}</Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          renderSectionHeader={renderHeader}
          renderSectionFooter={renderFooter}
          sections={DATA}
        />
      </Box>
      <Box style={{ position: "absolute", right: 20, bottom: 10, zIndex: 4 }}>
        <TouchableOpacity onPress={onNavigate}>
          <AddIcon />
        </TouchableOpacity>
      </Box>
    </ImageBackground>
  );
};

export default Transactions;
