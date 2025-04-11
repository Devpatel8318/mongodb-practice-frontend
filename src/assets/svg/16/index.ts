import { memo } from 'react'

import { ReactComponent as AttemptedIcon } from './attemptedIcon.svg'
import { ReactComponent as CloseIcon } from './closeIcon.svg'
import { ReactComponent as LogoutIcon } from './logoutIcon.svg'
import { ReactComponent as ProfileIcon } from './profileIcon.svg'
import { ReactComponent as SearchIcon } from './searchIcon.svg'
import { ReactComponent as TickIcon } from './tickIcon.svg'
import { ReactComponent as TodoIcon } from './todoIcon.svg'

export const Search = memo(SearchIcon)
export const Close = memo(CloseIcon)
export const Profile = memo(ProfileIcon)
export const Attempted = memo(AttemptedIcon)
export const Logout = memo(LogoutIcon)
export const Tick = memo(TickIcon)
export const Todo = memo(TodoIcon)
