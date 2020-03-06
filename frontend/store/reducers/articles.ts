import { NEXT_PAGE, ADD_ARTICLES, SET_SCROLL_POSITION } from '../actions';
import { IArticleOfClient } from '../../graphql/queries';

interface ArticlesState {
  articles: IArticleOfClient[]
  page: number
  targetPage: number
  scrollPosition: number
}


const articles = (state: ArticlesState = {articles: [], page: 0, targetPage: 0, scrollPosition: 0}
  , action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      if (state.page === state.targetPage) {
        return state
      }

      return {
        ...state,
        articles: [...state.articles, ...action.articles],
        page: action.page
      }
    case NEXT_PAGE:
      return {
        ...state,
        targetPage: state.targetPage + 1
      }
    case SET_SCROLL_POSITION:
      return {
        ...state,
        scrollPosition: action.scrollPosition
      }

    default:
      return state
  }
}

export default articles
