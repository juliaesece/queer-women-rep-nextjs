"use client"
import { useState } from "react";
import { Rating, SxProps, Theme } from "@mui/material";
import { rateCouple } from "../_actions/rateCouple";

export default function RatingsWrapper({ dbValue, dbCount, icon, emptyIcon, sx, couple, session, collectionName }:
    { dbValue: number, dbCount: number, icon: React.ReactNode, emptyIcon: React.ReactNode, sx: SxProps<Theme>, couple: any, session: any, collectionName: string }) {
    const [value, setValue] = useState(dbValue);
    const [countState, setCountState] = useState(dbCount);
    /* 
   WARNING: this component is using a sort of lazy/partly faulty "optimistic UI". It's better than before, but will work weirdly
   when people are changing their votes. Proper fix would need to check if the user has already voted, and recalculate from DB.
    */

    return (
        <>
            <span>
                {value == dbValue ? dbValue : (((dbValue * dbCount) + value) / (dbCount + 1))}
            </span>
            <Rating
                value={value}
                size="large"
                sx={sx}
                precision={0.5}
                readOnly={!session}
                icon={icon}
                emptyIcon={emptyIcon}
                onChange={async (event, newValue) => {
                    if (event.type == "click") {
                        console.log("click")
                        setValue(dbValue as number)
                        const res = await rateCouple(collectionName, couple._id, session.user.id, dbValue)
                        if (!res.success) {
                            console.error("There was an error")
                            return
                        }
                        setCountState(res.newCount)
                        return
                    }
                                            console.log("not click")

                    setValue(newValue as number)
                    const res = await rateCouple(collectionName, couple._id, session.user.id, newValue as number)
                    if (!res.success) {
                        console.error("There was an error")
                        return
                    }
                    setCountState(res.newCount)
                }}
            />
            {dbCount &&
                <span>
                    ({dbCount})
                </span>
            }
        </>
    );
}
