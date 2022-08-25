import { User } from "./user.entity";
import { OrderItem } from "./order.item.entity";
import { OrderFilters } from "../../modules/orders/dtos/order.item.dto";

export enum OrderStatus {
    CancelledByUser = -2,
    CancelledByCompany,
    New,
    OnTheWay,
    Fulfilled,
}

export type ColorType = {
    backgroundColor: string;
    textColor: string;
    text: string;
};

export class Order {
    constructor(
        public id: number,
        public customer: User,
        public items: OrderItem[],
        public deliveryCharges: number,
        public status: OrderStatus,
        public cancelReason: string,
        public createdAt: Date,
        public isNew: boolean,
    ) {}

    get total(): number {
        return this.items.reduce(
            (previous, current) => previous + current.quantity * current.price,
            this.deliveryCharges,
        );
    }

    get statusInfo(): ColorType {
        switch (this.status) {
            case OrderStatus.New:
                return {
                    backgroundColor: "#ffbf00",
                    textColor: "white",
                    text: "new",
                };
            case OrderStatus.OnTheWay:
                return {
                    backgroundColor: "#002d62",
                    textColor: "white",
                    text: "on the way",
                };
            case OrderStatus.CancelledByCompany:
                return {
                    backgroundColor: "#8b0000",
                    textColor: "white",
                    text: "canceled",
                };
            case OrderStatus.CancelledByUser:
                return {
                    backgroundColor: "#ff69b4",
                    textColor: "white",
                    text: "canceled",
                };
            case OrderStatus.Fulfilled:
                return {
                    backgroundColor: "#ff69b4",
                    textColor: "white",
                    text: "done",
                };
            default:
                return {
                    backgroundColor: "black",
                    textColor: "white",
                    text: "unknown",
                };
        }
    }

    static orderFiltersColor = (status: number) => {
        if (status == OrderFilters.New) {
            return "#ffbf00";
        } else if (status == OrderFilters.OnTheWay) {
            return "#002d62";
        } else if (status == OrderFilters.Fulfilled) {
            return "#ff69b4";
        } else {
            return "#8b0000";
        }
    };
}
