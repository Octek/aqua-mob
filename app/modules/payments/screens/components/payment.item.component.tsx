import React, { useMemo, useRef } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { Badge, ListItem } from "react-native-elements";
import { Payment } from "../../../../common/entities/payment.entity";
import moment from "moment";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { ActionState } from "../../../../common/redux/entity.state.interface";

type Props = {
    payment: Payment;
};

export const PaymentItemComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem.Swipeable
            bottomDivider={true}
            leftContent={
                <TouchableOpacity
                    onPress={() => console.log("this is testing")}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        flexDirection: "column",
                        backgroundColor: "#8b0000",
                    }}
                >
                    {ActionState.inProgress ? (
                        <ActivityIndicator color={"white"} />
                    ) : (
                        <Text style={{ color: "white" }}>Reverse</Text>
                    )}
                </TouchableOpacity>
            }
        >
            <ListItem.Content
                style={{
                    flex: 1,
                    alignItems: "center",
                    margin: 0,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <ListItem.Content style={{ marginLeft: 10 }}>
                    <ListItem.Title>
                        <Text style={{ justifyContent: "flex-start" }}>
                            {props.payment.customer.name}
                        </Text>
                        <Badge
                            value={props.payment.mode == 0 ? "Cash" : "Online"}
                            status={
                                props.payment.mode == 0 ? "success" : "primary"
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
                <ListItem.Title>Rs. {props.payment.amount}/-</ListItem.Title>
            </ListItem.Content>
            {/*</ListItem.Swipeable>*/}
        </ListItem.Swipeable>
    );
};
