import React from "react";
import { Avatar, Button, ListItem } from "react-native-elements";
import { User } from "../../../../common/entities/user.entity";

type Props = {
    customer: User;
    onPress: (customer: User) => void;
};

export const CustomerItemComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem
            onPress={() => props.onPress(props.customer)}
            bottomDivider={true}
            containerStyle={{
                backgroundColor:
                    props.customer.status === -1 ? "#EEEEEE" : "white",
            }}
        >
            <ListItem.Content style={{ flex: 1 }}>
                <ListItem.Content
                    style={{
                        alignItems: "center",
                        margin: 0,
                        flexDirection: "row",
                    }}
                >
                    <Avatar
                        size={32}
                        rounded
                        containerStyle={{ backgroundColor: "red" }}
                        title={props.customer.initials}
                    />
                    <ListItem.Content style={{ marginLeft: 10 }}>
                        <ListItem.Title>{props.customer.name}</ListItem.Title>
                        <ListItem.Subtitle>
                            {props.customer.mobile}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>
    );
};
