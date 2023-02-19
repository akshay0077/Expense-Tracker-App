import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';


export const CreaditDebit = (props) => {
    let t = props.style;
    return (
        <View style={[t.p2, t.flexRow, t.justifyBetween]}>
            <TouchableOpacity style={[t.bgGreen300, t.h12, t.p4, { borderRadius: 8, width: 130 }]}>
                <Text style={[t.textWhite, t.textShadow, t.fontBold]}>Creadit ₹ {props.creadit}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[t.bgRed300, t.h12, t.p4, { borderRadius: 8, width: 130 }]}>
                <Text style={[t.textWhite, t.textShadow, t.fontBold]}>Debit ₹ {props.debit}</Text>
            </TouchableOpacity>
        </View>
    );
}