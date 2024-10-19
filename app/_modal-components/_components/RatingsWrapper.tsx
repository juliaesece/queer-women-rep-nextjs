"use client"
import { useState } from "react";
import { Rating } from "@mui/material";
import { rateCouple } from "../_actions/rateCouple";

export default function RatingsWrapper({ value, icon, emptyIcon, sx, couple, session, collectionName }) {

    console.log("session", session.user.id)
    return (
        <>
            <Rating
                value={value}
                size="large"
                sx={sx}
                precision={0.5}

                icon={icon}
                emptyIcon={emptyIcon}
                onChange={(event, newValue) => {
                    console.log(collectionName)
                    rateCouple(collectionName, couple._id, session.user.id, newValue)
                }}
            />    </>
    );
}
