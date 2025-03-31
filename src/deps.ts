import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import axios, {
	AxiosError,
	AxiosResponse,
	CancelToken,
	CancelTokenSource,
} from 'axios'
import Cookies from 'js-cookie'
import ReactDOM from 'react-dom/client'

export { React, type RefObject, useEffect, useMemo, useRef, useState }

export {
	axios,
	AxiosError,
	type AxiosResponse,
	type CancelToken,
	type CancelTokenSource,
}

export {
	BrowserRouter,
	Link,
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate,
	RouterProvider,
} from 'react-router-dom'

export { Cookies }

export { ReactDOM }

export { Helmet } from 'react-helmet'

export {
	combineReducers,
	configureStore,
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit'

export {
	Provider,
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'react-redux'

export { toast, Toaster } from 'react-hot-toast'
