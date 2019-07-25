const CHANGE_POPUP = 'popup/CHANGE_POPUP';

export const changePopup = show_popup => ({ type: CHANGE_POPUP, show_popup });

const initialState = {
    show_popup: false,
};

export default function popup(state = initialState, action) {
    switch(action.type) {
        case CHANGE_POPUP:
            return {
                ...state,
                show_popup: action.show_popup
            };
        default:
            return state;
    }
}