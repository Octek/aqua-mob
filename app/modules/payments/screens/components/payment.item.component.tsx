import React from "react";
import { View, Text } from "react-native";
import { Avatar, Badge, ListItem } from "react-native-elements";
import { Payment } from "../../../../common/entities/payment.entity";
import moment from "moment";
type Props = {
    payment: Payment;
};

export const PaymentItemComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem bottomDivider={true}>
            <ListItem.Content style={{ flex: 1 }}>
                <ListItem.Content
                    style={{
                        alignItems: "center",
                        margin: 0,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <ListItem.Content style={{ marginLeft: 10 }}>
                        <ListItem.Title>
                            <Text style={{ justifyContent: "flex-start" }}>
                                {props.payment.customer.name}{" "}
                            </Text>
                            <Badge
                                value={
                                    props.payment.mode == 0 ? "Cash" : "Online"
                                }
                                status={
                                    props.payment.mode == 0
                                        ? "success"
                                        : "primary"
                                }
                            />
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {moment(props.payment.createdAt).format(
                                // "YYYY-MM-DD",
                                "DD MMMM YYYY",
                            )}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Title>
                        Rs. {props.payment.amount}/-
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem.Content>
        </ListItem>
    );
};
