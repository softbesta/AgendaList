import {
  IS_LOADING,
  AGENDA_SET,
  AGENDA_ADD,
  AGENDA_DELETE,
  AGENDA_UPDATE,
  AGENDA_SELETED
} from '../types';

const initialState = {
  list: [],
  selected: [],
  loading: false,
}

export default function agendaReducer( state=initialState, action ) {
  switch(action.type) {
    case AGENDA_SET:
      console.log(AGENDA_SET, '   payload: ', action.payload);
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case AGENDA_ADD:
      console.log(AGENDA_ADD, '   payload: ', action.payload);
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case AGENDA_DELETE:
      console.log(AGENDA_DELETE, '   payload: ', action.payload);
      if(Array.isArray(action.payload))
        return {
          ...state,
          list: state.list.filter(item => !action.payload.includes(item.id))
        };
      else
        return {
          ...state,
          list: state.list.filter(item => item.id !== action.payload)
        };
    case AGENDA_UPDATE:
      console.log(AGENDA_UPDATE, '   payload: ', action.payload);
      return {
        ...state,
        list: state.list.map(item => {
          if(item.id === action.payload.id) return action.payload;
          return item;
        })
      };
    case AGENDA_SELETED:
      console.log(AGENDA_SELETED, '   payload: ', action.payload);
      return {
        ...state,
        selected: action.payload
      };
    case IS_LOADING:
      console.log(IS_LOADING, '   payload: ', action.payload);
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}