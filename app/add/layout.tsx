"use client";

import AddContextProvider from "./AddContext";

export default function AddLayout({children}) {

    return (
            <AddContextProvider>
                {children}
            </AddContextProvider>

    );
}
