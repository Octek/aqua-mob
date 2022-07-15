import React from "react";
import { Avatar, ListItem } from "react-native-elements";
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
                    }}
                >
                    <ListItem.Content style={{ marginLeft: 10 }}>
                        <ListItem.Title>
                            {props.payment.customer.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {moment(props.payment.createdAt).format(
                                "YYYY-MM-DD",
                            )}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Title>Rs {props.payment.amount}</ListItem.Title>
                </ListItem.Content>
            </ListItem.Content>
        </ListItem>
    );
};
