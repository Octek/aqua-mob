import React from "react";
import { Badge, ListItem } from "react-native-elements";
import { LedgerItem } from "../../../../common/entities/ledger.entity";
import moment from "moment";

type Props = {
    ledgerItem: LedgerItem;
};

export const CustomerLedgerItemComponent: React.FC<Props> = (props) => {
    const ledgerItem = props.ledgerItem;

    return (
        // @ts-ignore
        <ListItem key={ledgerItem.id} bottomDivider={true}>
            <ListItem.Content
                style={{
                    flex: 6,
                    alignItems: "center",
                    margin: 0,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <ListItem.Content style={{ flex: 2 }}>
                    <ListItem.Title
                        style={{
                            flex: 3,
                        }}
                    >
                        {ledgerItem.description}

                        <Badge
                            containerStyle={{
                                marginVertical: 3,
                                padding: 3,
                            }}
                            badgeStyle={{
                                backgroundColor:
                                    ledgerItem.credit != 0
                                        ? "#FF1E00"
                                        : "green",
                            }}
                            value={ledgerItem.credit != 0 ? "Credit" : "Debit"}
                        />
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {moment(ledgerItem.createdAt).fromNow()}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{ flex: 1 }} />
                <ListItem.Content
                    style={{
                        flex: 3,
                        alignItems: "center",
                        margin: 0,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <ListItem.Content>
                        <ListItem.Title>
                            Rs.{"  "}
                            {ledgerItem.credit != 0
                                ? ledgerItem.credit
                                : ledgerItem.debit}
                            /-
                        </ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title>
                            Rs. {ledgerItem.balance}/-
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem.Content>
            </ListItem.Content>
            {/*</ListItem.Swipeable>*/}
        </ListItem>
    );
};
