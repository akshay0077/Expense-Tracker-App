{/* Header */ }

import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { tw } from "react-native-tailwindcss";
import { AntDesign } from '@expo/vector-icons';
export const Header = (props) => {

    return (
        <>
            <View style={[{ top: 0 }, tw.bgBlue800, tw.pT5, tw.w100, tw.h25, tw.flexRow, tw.alignCenter, tw.justifyBetween]}>
                <Text style={[tw.text2xl, tw.textWhite, tw.p5, tw.fontBold]}>Spend Tracker</Text>
                <View style={[{ width: 150 }, tw.p5, tw.flexRow, tw.justifyEnd]}>
                    <TouchableOpacity><Image source={require('../../assets/gamer.png')} style={[tw.w10, tw.h10]} /></TouchableOpacity>
                </View>
            </View>
        </>
    );

}