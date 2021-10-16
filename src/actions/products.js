import {fetchToken} from '../helpers/fetch'

export const addNewProduct = async (name,sku,price,stock)=>{
    

        const resp = await fetchToken('products',{name,sku,price,stock},'POST');
        const body = await resp.json();

        console.log(body);

        return body;

}

export const getMyProducts = async ()=>{
    

        const resp = await fetchToken('products/store/mine','GET');
        const body = await resp.json();

        console.log(body);

        return body;

}
