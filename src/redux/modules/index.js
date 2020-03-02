
import { combineReducers } from 'redux';
import entities from './entities';
import home from './home';
import details from './details';
import app from './app';

const rootReducer = combineReducers({
  entities,
  app,
  home,
  details
});

export default rootReducer;