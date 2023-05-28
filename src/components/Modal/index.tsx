import {FC, ReactNode} from "react";

interface IProps {
    children?: ReactNode;
    show: boolean;
}

const Modal: FC<IProps> = ({children, show}) => {
    if (show) {
        return (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <div className="w-full max-w-[300px] bg-white border border-gray-300 p-4 flex flex-col gap-2 shadow-2xl">
                    {children}
                </div>
            </div>
        )
    }
    return null;
}

export default Modal;
