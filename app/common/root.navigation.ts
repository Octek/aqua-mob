import { createNavigationContainerRef } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: any, params: any) {
    if (navigationRef.isReady()) {
        // @ts-ignore
        navigationRef.navigate(name, params);
    }
}

export function replace(name: any, params: any) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}
