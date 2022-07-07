import React from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import {
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
import { MenuBox } from "./components/menu.box.component";

type Props = {
    route: RouteProp<ParamList, "home">;
    navigation: StackNavigationProp<ParamList, "home">;
};

export const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
    return (
        <View
            style={{
                justifyContent: "flex-end",
                flex: 1,
            }}
        >
            <ImageBackground
                source={require("../../../resources/images/home-background.jpg")}
                style={{
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                }}
            />
            <View style={{ paddingBottom: 40 }}>
                <View style={{ flexDirection: "row" }}>
                    <MenuBox
                        backgroundColor={"#BCD979"}
                        title={"Orders"}
                        subtitle={""}
                        onPress={() => navigation.push("orders")}
                    />
                    <MenuBox
                        backgroundColor={"#6D98BA"}
                        title={"Payments"}
                        subtitle={""}
                        onPress={() => navigation.push("orders")}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <MenuBox
                        backgroundColor={"#EF8354"}
                        title={"Customers"}
                        subtitle={""}
                        onPress={() => null}
                    />
                    <MenuBox
                        backgroundColor={"#D9AE61"}
                        title={"Products"}
                        subtitle={""}
                        onPress={() => null}
                    />
                </View>
            </View>
        </View>
    );
};
