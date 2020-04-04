import { Action } from 'redux';
import { IArticleOfClient } from '../../graphql/queries';

export const ADD_ARTICLES = 'ADD_ARTICLES'

export interface AddArticlesAction extends Action<typeof ADD_ARTICLES> {
  articles: IArticleOfClient[]
  page: number
}

export const addArticles = (articles: IArticleOfClient[], page: number): AddArticlesAction => {
  return {type: ADD_ARTICLES, articles, page}
}

export const NEXT_PAGE = 'NEXT_PAGE'

export interface NextPageAction extends Action<typeof NEXT_PAGE> {
}

export const nextPage = (): NextPageAction => {
  return {type: NEXT_PAGE}
}

export const SET_SCROLL_POSITION = 'SET_SCROLL_POSITION'

export interface SetScrollPositionPageAction extends Action<typeof SET_SCROLL_POSITION> {
  scrollPosition: number
}

export const setScrollPosition = (scrollPosition: number): SetScrollPositionPageAction => {
  return {type: SET_SCROLL_POSITION, scrollPosition}
}

export const CHANGE_TAG = 'CHANGE_TAG'

export interface ChangeTagAction extends Action<typeof CHANGE_TAG> {
  tag: string
}

export const changeTag = (tag: string): ChangeTagAction => {
  return {type: CHANGE_TAG, tag}
}
