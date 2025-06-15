"use client"
import { useState } from "react";
import { Rating, SxProps, Theme } from "@mui/material";
import { rateCouple } from "../_actions/rateCouple";

export default function RatingsWrapper({ dbValue, icon, emptyIcon, sx, couple, session, collectionName }:
     { dbValue: number, icon: React.ReactNode, emptyIcon: React.ReactNode, sx: SxProps<Theme>, couple: any, session: any, collectionName: string }) {
    const [value, setValue] = useState(dbValue);

    return (
        <>
            <Rating
                value={value}
                size="large"
                sx={sx}
                precision={0.5}
                readOnly={!session}
                icon={icon}
                emptyIcon={emptyIcon}
                onChange={(event, newValue) => {
                    if (event.type == "click") {
                        setValue(dbValue as number)
                        rateCouple(collectionName, couple._id, session.user.id, dbValue)
                        return
                    }
                    setValue(newValue as number)
                    rateCouple(collectionName, couple._id, session.user.id, newValue as number)
                }}
            />
        </>
    );
}
