import { User } from "../../models/user"
import { api } from "../client-api"



const GetMe = async () => {
    const response = await api.get('users/me').json<User>()
    return response;
}

export const userService = () => { return { GetMe } }