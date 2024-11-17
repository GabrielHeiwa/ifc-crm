

import React from "react";

export function Main({ children, ...rest }: React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>) {
    return <div {...rest}>
        {children}
    </div>
}