import { apolloClient } from "../../graphql";
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SEND_MAIL } from "./queries";
import { CreateItemParam, GetItemsResponse } from '../types';


// 
// 
class ItemsService {
    async getItems(page: Number, count = 5): Promise<GetItemsResponse> {
        try {
            const response = await apolloClient.query({
                query: GET_ITEMS,
                variables: { page, count },
            });

            if (!response || !response.data)
                throw new Error("Cannot get items list!");

            return response.data.getItems.items;
        } catch (err) {
            throw err;
        }
    }

    async deleteItem(uuid: string): Promise<GetItemsResponse> {
        try {
            const response = await apolloClient.mutate({
                mutation: DELETE_ITEM,
                variables: { uuid },
            });
            if (!response || !response.data)
                throw new Error("Cannot get items list!");

            return response.data.deleteItem;
        } catch (err) {
            throw err;
        }
    }

    async createItem(param: CreateItemParam): Promise<GetItemsResponse> {
        try {
            const response = await apolloClient.mutate({
                mutation: ADD_ITEM,
                variables: { ...param },
            });

            if (!response || !response.data)
                throw new Error("Cannot get items list!");
            return response.data.createItem;
        } catch (err) {
            throw err;
        }
    }

    async updateItem(param: CreateItemParam, uuid: string): Promise<void> {
        try {
            const response = await apolloClient.mutate({
                mutation: UPDATE_ITEM,
                variables: { ...param, uuid },
            });

            if (!response || !response.data)
                throw new Error("Cannot get items list!");

        } catch (err) {
            throw err;
        }
    }

    async resendVerificationEmail(): Promise<void> {
        try {
            const response = await apolloClient.mutate({
                mutation: SEND_MAIL,
                variables: {},
            });

            if (!response || !response.data)
                throw new Error("Cannot get items list!");

        } catch (err) {
            throw err;
        }
    }
}

export default new ItemsService();
