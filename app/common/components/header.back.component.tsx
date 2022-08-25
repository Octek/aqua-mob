import React from "react";
import { Icon } from "react-native-elements";

type Props = {
    onPress: () => void;
};
export const HeaderBackComponent: React.FC<Props> = (props) => {
    return (
        <Icon
            type={"ionicon"}
            name={"chevron-back-outline"}
            size={32}
            tvParallaxProperties={undefined}
            onPress={() => props.onPress()}
        />
    );
};
