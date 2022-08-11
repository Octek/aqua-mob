import React from "react";
import { Badge, ListItem } from "react-native-elements";
import { User } from "../../../../common/entities/user.entity";

import moment from "moment";
type Props = {
    user: User;
    onPress: (user: User) => void;
};
export const UserItemComponent: React.FC<Props> = (props) => {
    console.log("createAt", props.user.createdAt);
    const user = props.user;
    return (
        // @ts-ignore
        <ListItem
            onPress={() => props.onPress(user)}
            containerStyle={{
                backgroundColor: props.user.status === -1 ? "#EEEEEE" : "white",
            }}
        >
            <ListItem.Content>
                <ListItem.Title>
                    {props.user.username}{" "}
                    <Badge
                        containerStyle={{
                            padding: 1,
                        }}
                        badgeStyle={{
                            backgroundColor: user.userRoleInfo.backgroundColor,
                        }}
                        value={props.user.userRoleInfo.text}
                    />
                </ListItem.Title>
                <ListItem.Subtitle>
                    {moment(props.user.createdAt).fromNow()}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>
    );
};
