import React from "react";

export function Container({ children, ...rest }: React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>) {
    return <div className="w-screen h-screen" {...rest}>
        {children}
    </div>
}