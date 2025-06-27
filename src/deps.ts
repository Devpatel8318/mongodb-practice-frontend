import {
	default as MonacoEditor,
	loader,
	useMonaco,
} from '@monaco-editor/react'
import {
	GoogleOAuthProvider,
	useGoogleLogin,
	useGoogleOneTapLogin,
} from '@react-oauth/google'
import {
	combineReducers,
	configureStore,
	createAsyncThunk,
	createSlice,
	type SerializedError,
} from '@reduxjs/toolkit'
import axios, {
	AxiosError,
	type AxiosResponse,
	type CancelToken,
	type CancelTokenSource,
} from 'axios'
import Cookies from 'js-cookie'
import * as monaco from 'monaco-editor'
import React, {
	createContext,
	type Dispatch,
	memo,
	type RefObject,
	Suspense,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { toast, Toaster } from 'react-hot-toast'
import { Img } from 'react-image'
import {
	Provider,
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'react-redux'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import {
	BrowserRouter,
	Link,
	Navigate,
	Outlet,
	Route,
	RouterProvider,
	Routes,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

export {
	axios,
	AxiosError,
	type AxiosResponse,
	BrowserRouter,
	type CancelToken,
	type CancelTokenSource,
	combineReducers,
	configureStore,
	Cookies,
	createAsyncThunk,
	createContext,
	createSlice,
	type Dispatch,
	ErrorBoundary,
	type FallbackProps,
	GoogleOAuthProvider,
	Helmet,
	HelmetProvider,
	Img,
	io,
	Link,
	loader,
	memo,
	monaco,
	MonacoEditor,
	Navigate,
	Outlet,
	Panel,
	PanelGroup,
	PanelResizeHandle,
	Provider,
	React,
	ReactDOM,
	type RefObject,
	Route,
	RouterProvider,
	Routes,
	type SerializedError,
	Socket,
	Suspense,
	toast,
	Toaster,
	type TypedUseSelectorHook,
	useCallback,
	useContext,
	useDispatch,
	useEffect,
	useGoogleLogin,
	useGoogleOneTapLogin,
	useLocation,
	useMemo,
	useMonaco,
	useNavigate,
	useParams,
	useRef,
	useSelector,
	useState,
	uuidv4,
}
