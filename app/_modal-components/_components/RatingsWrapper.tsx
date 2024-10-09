"use client"
import { useState } from "react";
import { Rating } from "@mui/material";
import { rateCouple } from "../_actions/rateCouple";

export default function RatingsWrapper({ couple, session }) {

    console.log("session", session.user.id)
    return (
        <>
            <Rating
                value={couple.globalRating}
                size="large"
                sx={{
                    color: "#d63900",
                    "& .MuiRating-icon": {
                        color: "#d63900",
                        opacity: 0.4
                    },
                    "& .MuiRating-iconFilled": {
                        opacity: 0.9
                    },
                    '& .MuiRating-iconHover': {
                        opacity: 1
                    }
                }}
                onChange={(event, newValue) => {
                    rateCouple("globalRatings", couple.globalRatingsId, session.user.id, newValue)
                }}
            />    </>
    );
}
