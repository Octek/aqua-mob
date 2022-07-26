import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { Badge, ListItem } from "react-native-elements";
import { Payment } from "../../../../common/entities/payment.entity";
import moment from "moment";
import { ActionState } from "../../../../common/redux/entity.state.interface";
import { useDispatch, useSelector } from "react-redux";
import { reversePayment } from "../../redux/actions/payment.actions";
import { ApplicationStateInterface } from "../../../../common/redux/application.state.interface";

type Props = {
    payment: Payment;
};

export const PaymentItemComponent: React.FC<Props> = (props) => {
    const paymentState = useSelector(
        (state: ApplicationStateInterface) => state.paymentsState,
    );
    const reversePayments = () => {
        dispatch(reversePayment(props.payment.id));
    };

    const dispatch = useDispatch();
    return (
        // @ts-ignore
        <ListItem.Swipeable
            bottomDivider={true}
            // props.payment.isReversal || props.payment.hasReversal ? (
            leftContent={
                props.payment.hasReversal == false &&
                props.payment.isReversal == false ? (
                    <TouchableOpacity
                        onPress={() => reversePayments()}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            flexDirection: "column",
                            backgroundColor: "#8b0000",
                        }}
                    >
                        {paymentState.addState == ActionState.inProgress ? (
                            <ActivityIndicator color={"white"} />
                        ) : (
                            <Text style={{ color: "white" }}>Reverse</Text>
                        )}
                    </TouchableOpacity>
                ) : null
            }
            // ) : null
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
                <ListItem.Content>
                    <ListItem.Title>
                        <Text style={{ justifyContent: "flex-start" }}>
                            {props.payment.customer.name}
                        </Text>
                        {!props.payment.hasReversal ||
                        !props.payment.isReversal ? (
                            <Badge
                                containerStyle={{ padding: 1, marginLeft: 5 }}
                                value={
                                    props.payment.mode == 0 ? "Cash" : "Online"
                                }
                                status={
                                    props.payment.mode == 0
                                        ? "success"
                                        : "primary"
                                }
                            />
                        ) : null}

                        {props.payment.hasReversal ||
                        props.payment.isReversal ? (
                            <Badge
                                containerStyle={{
                                    marginLeft: 5,
                                }}
                                value={
                                    props.payment.hasReversal
                                        ? "Reversed"
                                        : "Reversal"
                                }
                                status={
                                    props.payment.hasReversal
                                        ? "warning"
                                        : "error"
                                }
                            />
                        ) : null}
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
