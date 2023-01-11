import { apolloClient } from "../../graphql";
import { GET_ITEMS } from "./queries";
import { GetItemsResponse } from '../types';


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

            console.log("DATA: ", response.data);

            return response.data.Page;
        } catch (err) {
            throw err;
        }
    }
}

export default new ItemsService();
