import { ADD_TO_CART, ADD_TO_COMPARE, PREV_VIEWED, PINCODE } from "../actionType";

const initialState = {
    cart: [],
    viewed: [],
    addToCompare: [],
    user: {},
    pincode: null
};

export default function (state = initialState, action) {
    //console.log(action.type)
    switch (action.type) {
        case ADD_TO_CART: {
            const { id, content } = action.payload;
            const newState = { ...state }; //copying state 
            let cart = newState.cart; //extracting cart
            //find item in cart 
            let product = cart.find(
                (obj) => obj.id === content.id
            );
            let ind = cart.findIndex(
                (obj) => obj.id === content.id
            );

            console.log(product)
            //if index is not present
            if (!product) {
                let obj = { ...content, quantity: 1 }
                cart = [...cart, obj];
                return {
                    ...newState,
                    cart
                };

            }
            else {
                product.quantity = product.quantity + +content.increment;
                if (product.quantity === 0) {
                    cart = cart.splice(ind, 1);
                }
                console.log(newState.cart === cart)
                newState.cart = [...newState.cart];
                return newState

            }

        }
        case PREV_VIEWED: {
            //console.log(action.payload)
            const { id, content } = action.payload;
            console.log(content)
            const newState = { ...state }; //copying state 
            let viewList = newState.viewed;//extracting cart
            console.log(viewList)
            let obj = viewList.find(obj => obj.id === content.id)
            console.log("Found", obj)
            if (!obj) {
                console.log("inside if")
                viewList = [...viewList, content];
                let viewed = viewList
                return { ...newState, viewed };
            }

            return newState


        };
        case ADD_TO_COMPARE: {
            //console.log(action.payload)
            const { toBeRemoved, content } = action.payload;
            //console.log(content)
            const newState = { ...state }; //copying state 
            let addToCompare = newState.addToCompare;//extracting cart
            let length = addToCompare.length;
            let obj = addToCompare.find(obj => obj.id === content.id)
            let objInd = addToCompare.findIndex(obj => obj.id === content.id)
            //console.log("Found", obj)
            if (toBeRemoved) {
                addToCompare.splice(objInd, 1);
                //console.log(`Removed Object`);
                newState.addToCompare = [...newState.addToCompare]
                return newState;

            }
            else if (!obj && length !== 3) {
                //console.log("If")
                addToCompare = [...addToCompare, content];
                return { ...newState, addToCompare };
            }
            else if (!obj && length >= 3) {
                alert("only 3 items can be compared")
                // addToCompare.splice(0, 1);
                // console.log(addToCompare);
                // addToCompare.push(content);
                // newState.addToCompare = [...newState.addToCompare]
                return newState;
            }
            else {
                addToCompare.splice(objInd, 1);
                //console.log(`Removed Object`);
                newState.addToCompare = [...newState.addToCompare]
                return newState;
            }

            //return newState


        };
        case PINCODE: {
            const { content } = action.payload;
            //console.log(content)
            const newState = { ...state }; //copying state 
            let pincode = newState.pincode;
            pincode = content;
            //newState.pincode = [...newState.pincode];
            return { ...newState, pincode };
        }


        default:
            return state;
    }
}