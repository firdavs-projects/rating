import React, {FC, ReactNode} from "react";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    children: ReactNode;
}

const Select: FC<IProps> = ({ className, children, ...props}) => {
    return (
        <div className="px-4 border border-gray-300">
            <select className={`py-2 h-full ${className}`} {...props}>{children}</select>
        </div>

    )
}

export default Select;
