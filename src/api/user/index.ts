import {API_ROUTES} from "../../utils";
import axios from "axios";
import {IUser} from "../../types";

export interface IParams {
    size?: number;
    page?: number;
}

export const getRandomUsers = async (params: IParams = {}):Promise<IUser[] | string> => {
    try {
        const { size = '3', page = '1'} = params
        const { data } = await axios.get<IUser[]>(
            `${API_ROUTES.BASE_URL}${API_ROUTES.RANDOM_USERS}`,
            {
                params: { size, page },
                headers: {
                    Accept: 'application/json',
                },
            },
        );

        return data.map(i => ({ ...i, rating: 0 }));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error?.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
