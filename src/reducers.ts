import { IAppState, initialState, UrlState, FetchState } from './stateDefinition'
import { Actions } from './actionTypes'
import { AppActions } from './actionTypes'

export function rootReducer(state: IAppState = initialState, action: AppActions): IAppState {
	switch(action.type) {
		case Actions.INVALID_URL_ENTERED:
			return {...state, urlState: UrlState.INVALID_URL_ENTERED, url: null};
		case Actions.VALID_URL_ENTERED:
			return {...state, urlState: UrlState.VALID_URL_ENTERED, url: action.payload.url};
		case Actions.FAVICON_FETCH_STARTED:
			return {...state, fetchState: FetchState.FETCH_IN_PROGRESS};
		case Actions.FAVICON_FETCH_FAILED:
			return {...state, fetchState: FetchState.FETCH_ERROR, fetchError: action.error};
		case Actions.FAVICON_FETCH_COMPLETED:
			return {...state, fetchState: FetchState.FETCH_OK, fetchError: null, faviconData: action.faviconData, faviconMime: action.faviconMime, 
				fetchedTitle: action.title, title: action.title};
		default:
			return state;
	}
	
}

