import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text } from "../../components/theme";
import { Header } from "../../components/Header";
import { View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { CreaditDebit } from "../../components/CreaditDebit";
const Top = () => {
  const dispatch = useDispatch();

  const { transactions } = useSelector((state) => state.trs);

  const prices = transactions.map((transaction) => transaction.price);
  const balance = prices.reduce((prev, cur) => (prev += cur), 0);
  const expense =
    prices
      .filter((price) => price < 0)
      .reduce((prev, cur) => (prev += cur), 0) * -1;

  const income = expense + balance;

  return (<>
    <Header />
    <Box paddingLeft="l" paddingRight="l" style={{ paddingTop: 40 }}>
      <Box flexDirection="row" justifyContent="space-between">

      </Box>
      {/* Total Creadit Debit */}
      <View style={[tw.p10, tw.rounded, tw.shadowMd, { backgroundColor: "rgba(255,255,255,.2)" }]}>
        <Text style={[tw.relative, tw.textGray400, { fontStyle: "italic" }]}>Balance</Text>
        <Text style={[tw.textWhite, tw.text2xl, tw.fontBold]}>₹ {balance}</Text>
      </View>
      <CreaditDebit creadit={income} debit={expense} style={tw} />
      <View>
        {/* <Box flexDirection="row" justifyContent="space-between" marginTop="m">
          <Box>
            <Text
              textAlign="center"
              fontFamily="RRegular"
              variant="body"
              color="white"
            >
              Income
            </Text>
            <Text
              textAlign="center"
              fontFamily="SFBOLD"
              textAlign="center"
              fontSize={13}
              color="green"
              fontWeight="700"
            >
              ₦{income}
            </Text>
          </Box>
          <Box>
            <Text
              textAlign="center"
              fontFamily="RRegular"
              variant="body"
              color="white"
            >
              Expenses
            </Text>
            <Text
              textAlign="center"
              textAlign="center"
              fontSize={13}
              color="red"
              fontWeight="700"
              fontFamily="SFBOLD"
            >
              -₦{expense}
            </Text>
          </Box>
          <Box>
            <Text
              fontFamily="RRegular"
              textAlign="center"
              variant="body"
              color="white"
            >
              Balance
            </Text>
            <Text
              textAlign="center"
              fontWeight="700"
              fontFamily="SFBOLD"
              fontSize={13}
              color="brown"
            >
              ₦{balance}
            </Text>
          </Box>
        </Box> */}
      </View>
    </Box>
  </>

  );
};

export default Top;
