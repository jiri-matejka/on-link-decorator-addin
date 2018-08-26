export enum UrlState {
	NO_URL_ENTERED = "NO_URL_ENTERED",
	VALID_URL_ENTERED = "VALID_URL_ENTERED",
	INVALID_URL_ENTERED = "INVALID_URL_ENTERED"
}

export enum FetchState {
	NOT_STARTED = "NOT_STARTED",
	FETCH_IN_PROGRESS = "FETCH_IN_PROGRESS",
	FETCH_ERROR = "FETCH_ERROR",
	FETCH_OK = "FETCH_OK"
}

export interface IAppState {
	urlState: UrlState,
	fetchState: FetchState,
	fetchError: string,
	url: string,
	urlBeingFetched: string,	
	title: string,
	fetchedTitle: string,
	faviconData: string,
	faviconMime: string	
}

export const initialState : IAppState = {
	urlState: UrlState.NO_URL_ENTERED,
	fetchState: FetchState.NOT_STARTED,
	fetchError: null,
	url: null,
	urlBeingFetched: null,
	title: null,
	fetchedTitle: null,
	faviconData: null,
	faviconMime: null
}

