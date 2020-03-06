import { combineReducers } from 'redux'
import articles from './articles';

export const reducer = combineReducers({
  articles
})

export type RootState = ReturnType<typeof reducer>;
