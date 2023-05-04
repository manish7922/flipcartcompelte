import { ADD_TO_CART, ADD_TO_COMPARE, PREV_VIEWED, PINCODE } from "../actionType";

let nextTodoId = 0;

export const addToCart = content => ({
    type: ADD_TO_CART,
    payload: {
        id: ++nextTodoId,
        content
    }
});
export const addToPincode = content => ({
    type: PINCODE,
    payload: {
        content
    }
});

export const addforComparison = content => ({
    type: ADD_TO_COMPARE,
    payload: {
        content
    }
});
export const removeFromComparison = content => ({
    type: ADD_TO_COMPARE,
    payload: {
        content,
        toBeRemoved: true
    }
});

export const prevViewed = content => ({
    type: PREV_VIEWED,
    payload: {
        content
    }
});

export const toggleTodo = id => ({
    // type: TOGGLE_TODO,
    // payload: { id }
});