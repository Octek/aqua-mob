import { Page } from "../entities/page.entity";

export enum ActionState {
    failed = -1,
    notStarted,
    inProgress,
    done,
}

export interface CommonInterface {
    fetchState: ActionState;
    addState: ActionState;
    updateState: ActionState;
    deleteState: ActionState;
}

export interface EntityStateInterface<T> extends CommonInterface {
    entity?: T;
}

export interface MultipleEntitiesStateInterface<T> extends CommonInterface {
    page?: Page;
    entities: T[];
}
