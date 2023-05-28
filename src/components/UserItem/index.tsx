import {FC, useState} from "react";
import {Button} from "../index";
import Modal from "../Modal";
import {IUser} from "../../types";

interface IProps {
    user: IUser;
    replace: (isRatingList: boolean, user: IUser) => void;
    save?: (user: IUser) => void;
    isRating: boolean;
}

const UserItem:FC<IProps> = ({ user, replace, save, isRating }) => {

    const [modal, setModal] = useState<IUser | null>(null);
    const onChangeRating = (newRating: number, isRatingList = false) => () => {
        if (isRatingList) {
            if (newRating === 5 || newRating === -5) {
                save && save({...user, rating: newRating});
                setModal(user);
                console.log(
                    `Достижение ${newRating > 0 
                        ? 'верхней' 
                        : 'нижней'
                    } границы рейтинга пользователя ${user.username}: ${newRating}. Открытие модального окна`
                )
                return;
            }
            save && save({...user, rating: newRating});
            console.log(`Изменение рейтинга пользователя ${user.username} с ${user.rating} на ${newRating}`)
        } else {
            // if in main list replace it to rating list
            replace(isRatingList, {...user, rating: newRating});
            console.log(`Добавление пользователя ${user.username} в список редактирования рейтингов`)
        }
    }

    const handleReplaceToMain = () => {
        replace(true, user);
        console.log(`Возврат пользователя ${user.username} в основной список`)
    }

    const submit = () => {
        replace(true, modal as IUser);
        setModal(null);
        console.log(`${user.rating > 0
            ? 'Вознагражение'
            : 'Бан'
        } пользователя ${user.username} за ${user.rating > 0
            ? 'лучший'
            : 'плохой'
        } рейтинг и возврат в основной список`)
    }

    const cancel = () => {
        setModal(null);
        console.log('Отмена действия и закрытие модального окна')
    }

    const userName = (
        <div>
            <p>{user.first_name} {user.last_name}</p>
            <span className="text-xs text-gray-500">@{user.username}</span>
        </div>
    )

    if (isRating) {
        return (
            <li className="flex flex-wrap gap-2 justify-between items-center w-full border-b border-b-gray-300 py-2">
                {userName}

                <div className="flex ml-auto items-center gap-2">
                    {user.rating === 0 && <Button onClick={handleReplaceToMain}>Вернуть</Button>}
                    <Button
                        onClick={onChangeRating(user.rating === -5 ? -5 : user.rating - 1, true)}
                    >-</Button>
                    <span className="px-2 min-w-[34px] text-center font-bold">{user.rating}</span>
                    <Button
                        onClick={onChangeRating(user.rating === 5 ? 5 : user.rating + 1, true)}
                    >+</Button>
                </div>
                <Modal show={!!modal}>
                    <p className="text-gray-700 text-center">
                        {Number(modal?.rating) >= 5
                            ? `Нужно вознаградить ${modal?.username}. Сделать это?`
                            : `Пора забанить @${modal?.username}. Сделать это?`}
                    </p>
                    <Button onClick={submit}>Да</Button>
                    <Button onClick={cancel}>Нет</Button>
                </Modal>
            </li>
        )
    }

    return (
        <li className="flex gap-2 justify-between items-center w-full border-b border-b-gray-300 py-2">
            {userName}

            <div className="flex gap-2">
                <Button
                    className="w-full"
                    onClick={onChangeRating(user.rating === -5 ? -5 : user.rating - 1)}
                >-</Button>
                <Button
                    className="w-full"
                    onClick={onChangeRating(user.rating === 5 ? 5 : user.rating + 1)}
                >+</Button>
            </div>
        </li>
    )
};

export default UserItem;
