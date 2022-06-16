import { combineReducers } from 'redux';
import agendaReducer from './agendaReducer';

export default combineReducers({
  agenda: agendaReducer,
});