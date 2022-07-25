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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MenuBox } from "./components/menu.box.component";
import { Icon } from "react-native-elements";

type Props = {
    route: RouteProp<ParamList, "home">;
    navigation: StackNavigationProp<ParamList, "home">;
};

export const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <>
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
            <View
                style={{
                    justifyContent: "flex-end",
                    flex: 1,
                }}
            >
                <View style={{ paddingHorizontal: 5, paddingBottom: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <MenuBox
                            backgroundColor={"#BCD979"}
                            title={"Orders"}
                            subtitle={""}
                            onPress={() => navigation.push("ordersNavigator")}
                        />
                        <MenuBox
                            backgroundColor={"#6D98BA"}
                            title={"Payments"}
                            subtitle={""}
                            onPress={() => navigation.push("paymentsNavigator")}
                        />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <MenuBox
                            backgroundColor={"#EF8354"}
                            title={"Customers"}
                            subtitle={""}
                            onPress={() =>
                                navigation.push("customersNavigator")
                            }
                        />
                        <MenuBox
                            backgroundColor={"#D9AE61"}
                            title={"Products"}
                            subtitle={""}
                            onPress={() =>
                                navigation.push("productsNavigator", {
                                    selectable: false,
                                })
                            }
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "#cadcf0",
                        height: safeAreaInsets.bottom + 50,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            flex: 1,
                        }}
                    >
                        <Icon
                            type={"ionicon"}
                            name={"person-circle-sharp"}
                            size={40}
                            tvParallaxProperties={undefined}
                        />
                        <Icon
                            type={"ionicon"}
                            name={"people-circle-sharp"}
                            size={40}
                            tvParallaxProperties={undefined}
                        />
                    </View>
                    <View style={{ alignItems: "flex-end", flex: 1 }}>
                        <Icon
                            type={"ionicon"}
                            name={"log-out-sharp"}
                            size={40}
                            tvParallaxProperties={undefined}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};
