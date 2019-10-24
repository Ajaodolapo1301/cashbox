import  { GET_LISTS, GET_USER,GET_LISTS_ERROR, ADD_LIST, 
    DELETE_LIST,UPDATE_LIST,ADD_LIST_ERROR,UPDATE_LIST_ERROR, 
    GET_USER_ERROR, DELETE_LIST_ERROR} from "../actions/types"


const initialState= {
    clients: [],
    client: {},
    error: {}
}

export default function (state = initialState,action) {
    switch (action.type) {
        case GET_LISTS:
           return{
               ...state,
               clients: action.payload
           } 

           case GET_LISTS_ERROR:
           case GET_USER_ERROR:
           case UPDATE_LIST_ERROR:
           case DELETE_LIST_ERROR:
           case ADD_LIST_ERROR:
            return{
                ...state,
                error:action.payload
            }

            case ADD_LIST:
           return{
                ...state,
                clients: [action.payload, ...state]
           }
           case GET_USER:
           return{
               ...state,
               client: action.payload
           }
           case DELETE_LIST:
               return{
                   ...state,
                   clients: state.clients.filter(client=>client.id !==action.payload)
               }
               case UPDATE_LIST:
               return{
                   ...state,
                   clients: state.clients.map(client=> client.id === action.payload.id ? (client= action.payload): client)
               }


        default:
            return state;
    }
}