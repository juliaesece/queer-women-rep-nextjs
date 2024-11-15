"use client"
import { Rating } from "@mui/material";

export default function RatingsWrapper({ couple, icon, emptyIcon, sx, setCouple, name }) {

    return (
        <Rating
            value={couple[name]}
            size="large"
            name={name}
            sx={sx}
            precision={0.5}
            icon={icon}
            emptyIcon={emptyIcon}
            onChange={(event, newValue) => {
                if (event.type == "click") {
                    setCouple(
                        prevCouple => ({
                            ...prevCouple,
                            [name]: couple[name]
                        })
                    )
                    return
                }
                setCouple(
                    prevCouple => ({
                        ...prevCouple,
                        [name]: newValue
                    })
                )
            }}
        />
    );
}
