import React from "react";
import { Badge, ListItem } from "react-native-elements";
import { Payment } from "../../../../common/entities/payment.entity";
import moment from "moment";
import { FilterSegment } from "../../dtos/payment.dto";

type Props = {
    payment: Payment;
    onPress: (payment: Payment) => void;
};

export const PaymentItemComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem
            onPress={() => {
                props.onPress(props.payment);
            }}
            key={props.payment.id}
            containerStyle={{
                backgroundColor: props.payment.hasReversal
                    ? "#EEEEEE"
                    : "white",
            }}
            bottomDivider={true}
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
                        {props.payment.customer.name}
                        {!props.payment.hasReversal ||
                        !props.payment.isReversal ? (
                            <Badge
                                containerStyle={{
                                    padding: 1,
                                }}
                                badgeStyle={{
                                    backgroundColor:
                                        props.payment.mode == 0
                                            ? "#3CCF4E"
                                            : "#3AB4F2",
                                }}
                                value={
                                    props.payment.mode == 0 ? "Cash" : "Online"
                                }
                            />
                        ) : null}

                        {props.payment.hasReversal ||
                        props.payment.isReversal ? (
                            <Badge
                                badgeStyle={{
                                    backgroundColor: props.payment.hasReversal
                                        ? "#8b0000"
                                        : "#D75281",
                                }}
                                value={
                                    props.payment.hasReversal
                                        ? "Reversed"
                                        : "Reversal"
                                }
                            />
                        ) : null}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {moment(props.payment.createdAt).fromNow()}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Title>Rs. {props.payment.amount}/-</ListItem.Title>
            </ListItem.Content>
            {/*</ListItem.Swipeable>*/}
        </ListItem>
    );
};
