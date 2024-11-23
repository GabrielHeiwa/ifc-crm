import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom"

export function SideBar({ children: _, ...rest }: React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>) {
    return <div {...rest}>
        <div className="row-span-1 flex flex-row items-center gap-4 p-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <span className="text-lg font-medium font-mono">Gabriel Paz Dos Santos</span>
        </div>

        <ul className="row-span-11 p-2 text-lg flex flex-col gap-2">
            <Link to={'/negotiations'} className="cursor-pointer hover:bg-gray-800 hover:text-white p-1 rounded-sm">
                Negociações
            </Link>
            <Link to={'/products'} className="cursor-pointer hover:bg-gray-800 hover:text-white p-1 rounded-sm">
                Produtos
            </Link>
            <Link to={'/users'} className="cursor-pointer hover:bg-gray-800 hover:text-white p-1 rounded-sm">
                Usuários
            </Link>
        </ul>
    </div>
}