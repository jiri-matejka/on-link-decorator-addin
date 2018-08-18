export enum Actions {
	VALID_URL_ENTERED = "VALID_URL_ENTERED",
	INVALID_URL_ENTERED = "INVALID_URL_ENTERED",
	FETCH_STARTED = "FETCH_STARTED",
	FETCH_FAILED = "FETCH_FAILED",
	FETCH_COMPLETED = "FETCH_COMPLETED",
	TITLE_MODIFIED = "TITLE_MODIFIED",

	ONENOTE_BOOKMARKBLOCK_INSERTED = "ONENOTE_BOOKMARKBLOCK_INSERTED",
}

export interface IAction {
	type: Actions
}

export interface IValidUrlEnteredAction {
	type: Actions.VALID_URL_ENTERED,
	payload: {
		url: string
	}
}

export function validUrlEntered(url: string) : IValidUrlEnteredAction { return { type: Actions.VALID_URL_ENTERED, payload: { url: url }} }

export interface IInvalidUrlEnteredAction {
	type: Actions.INVALID_URL_ENTERED
}

export function invalidUrlEntered() {return { type: Actions.INVALID_URL_ENTERED} }


export type AppActions = IValidUrlEnteredAction | IInvalidUrlEnteredAction;

