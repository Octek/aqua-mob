import React from "react";
import { ListItem } from "react-native-elements";

type Props = {
    deliveryCharges: number;
    onDeliveryChargesChanged: (charges: number) => void;
};

export const CartItemDeliveryChargesComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem bottomDivider={true}>
            <ListItem.Content style={{ flex: 0.5 }}>
                <ListItem.Content style={{ flex: 1, flexDirection: "row" }}>
                    <ListItem.Title>Delivery Charges</ListItem.Title>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Content
                style={{
                    flexDirection: "row",
                    flex: 0.5,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    alignItems: "flex-end",
                }}
            >
                <ListItem.Input
                    autoCompleteType={"none"}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    value={props.deliveryCharges.toString()}
                    onChangeText={(text) =>
                        props.onDeliveryChargesChanged(parseInt(text || "0"))
                    }
                    style={{
                        fontSize: 15,
                        width: 50,
                        paddingTop: 0,
                        paddingBottom: 0,
                        marginTop: -15,
                        marginRight: 0,
                        marginBottom: -15,
                        textAlign: "right",
                    }}
                />
                <ListItem.Title>Rs.</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    );
};
