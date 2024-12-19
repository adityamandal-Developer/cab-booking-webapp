import userModel from "../models/user.model.js";

export const createUser = async ({ firstname, lastname, email, password }) => {

    try {
        if (!(firstname || email || password)) {
            throw new Error("All fields required")
        }

        const user = userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        })

        return user
    } catch (error) {
        console.log(error)
    }

}