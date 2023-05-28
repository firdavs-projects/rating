import {FC} from "react";
import {UserItem} from "../index";
import {IUser} from "../../types";

interface IProps {
    users: IUser[];
    replace: (isRatingList: boolean, user: IUser) => void;
    save?: (user: IUser) => void;
    isRating?: boolean;
}
const UserList: FC<IProps> = ({ users, replace, save, isRating = false }) => {

    return (
        <ul id="main-list" className="mb-auto">
            {users.map(user => (
                <UserItem key={user.id} user={user} replace={replace} save={save} isRating={isRating} />
            ))}
        </ul>
    )
};

export default UserList;
