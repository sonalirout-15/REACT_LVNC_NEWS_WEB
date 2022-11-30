import { combineReducers } from "redux";
import adminReducer from "./Reducers/AdminReducer";
import campaignReducer from "./Reducers/CampaignReducer";
import categoryReducer from "./Reducers/CategoryReducer";
import mattersReducer from "./Reducers/MattersReducer";
import postReducer from "./Reducers/PostReducer";
import subcategoryReducer from "./Reducers/SubcategoryReducer";

const rootReducer = combineReducers({
    admin: adminReducer,
    categoryData: categoryReducer,
    subcategory: subcategoryReducer,
    metters: mattersReducer,
    post: postReducer,
    campaning: campaignReducer,
})

export default rootReducer;