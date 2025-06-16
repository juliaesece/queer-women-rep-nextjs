"use client"
import { useState } from "react";
import { Rating } from "@mui/material";
import { rateCouple } from "../_actions/rateCouple";

export default function RatingsWrapper({ dbValue, icon, emptyIcon, sx, book, session, collectionName }) {
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
                        setValue(dbValue)
                        rateCouple(collectionName, book._id, session.user.id, dbValue)
                        return
                    }
                    setValue(newValue)
                    rateCouple(collectionName, book._id, session.user.id, newValue)
                }}
            />
        </>
    );
}
