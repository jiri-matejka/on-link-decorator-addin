import { IAppState, initialState, UrlState, FetchState } from './stateDefinition'
import { Actions } from './actionTypes'
import { AppActions } from './actionTypes'

export function rootReducer(state: IAppState = initialState, action: AppActions): IAppState {
	switch(action.type) {
		case Actions.INVALID_URL_ENTERED:
			return {...state, urlState: UrlState.INVALID_URL_ENTERED, url: null, fetchState: FetchState.NOT_STARTED,
				faviconData: null, faviconMime: null, title: null, fetchedTitle: null};
		case Actions.VALID_URL_ENTERED:
			return {...state, urlState: UrlState.VALID_URL_ENTERED, url: action.payload.url};
		case Actions.FAVICON_FETCH_STARTED:
			return {...state, fetchState: FetchState.FETCH_IN_PROGRESS, urlBeingFetched: action.url, faviconData: null, faviconMime: null, title: null, fetchedTitle: null};
		case Actions.FAVICON_FETCH_FAILED:
			if(action.url !== state.url) { // in the meanwhile, user changed url and another fetch is in progress
				return state;
			}
			return {...state, fetchState: FetchState.FETCH_ERROR, fetchError: action.error, faviconData: null, faviconMime: null, title: null,
				fetchedTitle: null, urlBeingFetched: null};

		case Actions.FAVICON_FETCH_COMPLETED:
			if(action.url !== state.url) {
				return state;
			}			
			return {...state, fetchState: FetchState.FETCH_OK, fetchError: null, faviconData: action.faviconData, faviconMime: action.faviconMime, 
				fetchedTitle: action.title, title: action.title, url: action.resultUrl};				
				
		default:
			return state;
	}
	
}

