import React, { useState } from "react";

import { View, Text } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { Icon } from "react-native-elements";

export const StaticDropdownComponent = () => {
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    return (
        <View
            style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Menu
                visible={visible}
                //"filter-outline"
                anchor={
                    <Text onPress={showMenu}>
                        <Icon
                            type={"ionicon"}
                            name={"filter-outline"}
                            size={25}
                            tvParallaxProperties={undefined}
                        />
                    </Text>
                }
                onRequestClose={hideMenu}
            >
                <MenuItem onPress={hideMenu}>New</MenuItem>
                <MenuDivider color="black" />

                <MenuItem onPress={hideMenu}>On The Way</MenuItem>
                <MenuDivider color="black" />

                <MenuItem onPress={hideMenu}>Done</MenuItem>
                <MenuDivider color="black" />

                <MenuItem onPress={hideMenu}>Cancelled</MenuItem>

                {/*<MenuItem onPress={hideMenu}>Remove Filter</MenuItem>*/}
                <MenuDivider color="black" />
                <MenuItem onPress={hideMenu}>Remove Filter</MenuItem>
                <MenuDivider color="black" />
            </Menu>
        </View>
    );
};
