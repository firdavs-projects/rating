import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {Button, Select, UserList} from "../index";
import {getRandomUsers, IParams} from "../../api";
import {useSearchParams} from "react-router-dom";
import {IUser} from "../../types";

const RATING_LIST = 'RATING_LIST';
const Rating: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState<number>(
        Number(searchParams.get('page')) || 1
    );
    const [size, setSize] = useState<number>(
        Number(searchParams.get('size')) || 3
    );

    const [userList, setUserList] = useState<IUser[]>([]);
    const [ratingList, setRatingList] = useState<IUser[]>(
        // get initial rating list from localstorage
       JSON.parse(localStorage.getItem(RATING_LIST) || '[]')
    );
    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = async (params: IParams = {}): Promise<IUser[]> => {
        setLoading(true);
        const users = await getRandomUsers({page, size, ...params});
        setLoading(false);
        return users as IUser[];
    }

    const handleUpdate = async (ev?: object) => {
        setUserList(await getUsers());
        ev && console.log('Обновление основного списка пользователей');
    }

    const handleAdd = async () => {
        const newPage = page + 1;
        setPage(newPage);
        setUserList([...userList, ...await getUsers({page: newPage})]);
        console.log('Добавление пользователей в основной список')
    }

    const handleReset = async () => {
        console.log('Сброс на изначальную настройку списка')
        setPage(1);
        setSize(3);
        setUserList(await getUsers({page: 1, size: 3}));
    }

    const handleChangeSize = async (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target?.value;
        setSize(+value);
        setUserList(await getUsers({size: +value}));
        console.log(`Изменение лимита пользователей на ${value}`)
    }

    const save = (user: IUser) => {
        setRatingList(ratingList.map(u => u.id === user.id ? user : u));
    }

    const replace = (isRatingList: boolean, user: IUser) => {
        if (isRatingList) {
            // replace to main list
            setUserList([...userList, user]);
            setRatingList(ratingList.filter(i => i.id !== user.id));
        } else {
            // replace to rating list
            setRatingList([...ratingList, user]);
            setUserList(userList.filter(i => i.id !== user.id));
        }
    }

    useEffect(() => {
        handleUpdate();
    }, []);

    useEffect(() => {
        // save rating list to the localstorage
        localStorage.setItem(RATING_LIST, JSON.stringify(ratingList))
    }, [ratingList]);

    useEffect(() => {
        setSearchParams({page: page.toString(), size: size.toString()})
    }, [page, size]);

    return (
        <section className="flex flex-col md:flex-row gap-3 h-full">
            {loading && (
                <div className=" w-full border border-gray-300 p-4 flex justify-center items-center">
                    Загрузка ...
                </div>
            )}

            {!loading && (
                <div className="bg-white w-full flex flex-col justify-between min-h-full border border-gray-300 p-4">
                    <h3 className="text-lg text-gray-700 font-bold mb-2">Список пользователей</h3>
                    <UserList users={userList} replace={replace} />
                    <div className="flex gap-2 mt-2 flex-wrap">
                        <Button onClick={handleUpdate}>Обновить</Button>
                        <Button onClick={handleAdd}>Ещё</Button>
                        <Select defaultValue={size} onChange={handleChangeSize}>
                            <option value={3}>3</option>
                            <option value={5}>5</option>z
                            <option value={7}>7</option>
                        </Select>
                        <Button onClick={handleReset}>Сбросить</Button>
                    </div>
                </div>
            )}

            <div className="bg-white w-full min-h-full border border-gray-300 p-4">
                <h3 className="text-lg text-gray-700 font-bold mb-2">Оценки пользователей</h3>
                <UserList users={ratingList} replace={replace} save={save} isRating />
            </div>
        </section>
    )
}

export default Rating;
