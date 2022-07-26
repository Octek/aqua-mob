import React from "react";
import { Avatar, Button, ListItem } from "react-native-elements";
import { OrderItemDto } from "../../dtos/order.item.dto";
import { Text, TouchableOpacity } from "react-native";

type Props = {
    item: OrderItemDto;
    onIncrease: (item: OrderItemDto) => void;
    onDecrease: (item: OrderItemDto) => void;
};

export const CartItemComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem bottomDivider={true}>
            <ListItem.Content style={{ flex: 0.5 }}>
                <ListItem.Content
                    style={{
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => props.onDecrease(props.item)}
                        style={{
                            backgroundColor: "#cadcf0",
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            marginRight: 5,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text>-</Text>
                    </TouchableOpacity>
                    <ListItem.Title style={{ fontWeight: "bold" }}>
                        {props.item.quantity}
                    </ListItem.Title>
                    <TouchableOpacity
                        onPress={() => props.onIncrease(props.item)}
                        style={{
                            backgroundColor: "#cadcf0",
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            marginLeft: 5,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text>+</Text>
                    </TouchableOpacity>
                    <ListItem.Title>
                        {" "}
                        x {props.item.product.name}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Content
                style={{
                    flex: 0.5,
                    alignItems: "flex-end",
                }}
            >
                <ListItem.Title style={{ textAlign: "right" }}>
                    Rs. {props.item.price * props.item.quantity}/-
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    );
};
