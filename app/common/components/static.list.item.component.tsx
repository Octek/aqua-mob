import React from "react";
import { ListItem } from "react-native-elements";

type Props = {
    title: string;
    value: string;
    showChevron?: boolean;
};

export const StaticListItemComponent: React.FC<Props> = ({
    title,
    value,
    showChevron,
}) => {
    return (
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{value}</ListItem.Title>
                <ListItem.Subtitle>{title}</ListItem.Subtitle>
            </ListItem.Content>
            {(showChevron || showChevron === undefined) && (
                <ListItem.Chevron tvParallaxProperties={undefined} />
            )}
        </ListItem>
    );
};
