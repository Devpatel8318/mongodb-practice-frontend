import {
	combineReducers,
	configureStore,
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'src/deps'

import * as reducers from './reducers'

const RootReducer = combineReducers({ ...reducers })

export type RootState = ReturnType<typeof RootReducer>

const store = configureStore({
	reducer: RootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const getStore = store.getState
export const appDispatcher = store.dispatch //use this
export default store
