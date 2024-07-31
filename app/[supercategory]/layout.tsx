import Aside from "../_layout-components/Aside";
import PaginationConductor from "../_nav-components/PaginationConductor";

export default function SupercategoryLayout({ children }) {

    return (
        <>
            <Aside />
            {children}

        </>
    )

}
