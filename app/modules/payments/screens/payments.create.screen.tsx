import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentMode } from "../dtos/payment.item.dto";
type Props = {
    route: RouteProp<ParamList, "createPayments">;
    navigation: StackNavigationProp<ParamList, "createPayments">;
};

export const PaymentsCreateScreen: React.FC<Props> = ({ navigation }) => {
    const [amount, setAmount] = useState("0");
    const [mode, setMode] = useState<PaymentMode>(PaymentMode.Cash);
    const [currentIndex, setCurrentIndex] = useState(0);
    const buttons = ["Cash", "Online"];
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    style={{ marginRight: 10 }}
                    size={28}
                    name="save"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() => console.log("save button pressed")}
                />
            ),
        });
    });

    const rows = [
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <ListItem.Title>Rs </ListItem.Title>
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"Amount"}
                    value={amount}
                    keyboardType={"numeric"}
                    onChangeText={(value) => setAmount(value)}
                />
                <ListItem.Subtitle>Amount</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <ListItem.ButtonGroup
                    buttons={buttons}
                    selectedIndex={currentIndex}
                    onPress={(selected) => setCurrentIndex(selected)}
                    containerStyle={{ maxWidth: 140 }}
                />
                <ListItem.Title />
                <ListItem.Subtitle>Payment Mode</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
    ];

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={rows} renderItem={(item) => item.item} />
        </View>
    );
};
