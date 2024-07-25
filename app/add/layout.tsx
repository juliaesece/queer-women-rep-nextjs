"use client";

import FormNav from "./_components/FormNav";
import AddContextProvider from "./AddContext";

export default function AddLayout({children}) {

    return (
            <AddContextProvider>
                <FormNav />
                {children}
            </AddContextProvider>

    );
}
