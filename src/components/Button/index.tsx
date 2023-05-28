import React, {FC, ReactNode} from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
}

const Button: FC<IProps> = ({ className, children, ...props}) => {
    return (
        <button className={`px-4 py-2 border border-gray-300 ${className}`} {...props}>{children}</button>
    )
}

export default Button;
