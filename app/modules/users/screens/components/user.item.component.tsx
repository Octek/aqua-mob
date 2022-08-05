import React from "react";
import { ListItem } from "react-native-elements";
import { User } from "../../../../common/entities/user.entity";

import moment from "moment";
type Props = {
    user: User;
};
export const UserItemComponent: React.FC<Props> = (props) => {
    console.log("createAt", props.user.createdAt);
    return (
        // @ts-ignore
        <ListItem>
            <ListItem.Content>
                <ListItem.Title>{props.user.username}</ListItem.Title>
                <ListItem.Subtitle>
                    {moment(props.user.createdAt).fromNow()}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>
    );
};
