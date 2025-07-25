import { React } from 'src/deps'
const { memo } = React

import { ReactComponent as AttemptedIcon } from './attemptedIcon.svg'
import { ReactComponent as DownArrowPaginationIcon } from './downArrowPaginationIcon.svg'
import { ReactComponent as FilterIcon } from './filterIcon.svg'
import { ReactComponent as HamburgerMenuIcon } from './hamburgerMenuIcon.svg'
import { ReactComponent as LeftArrowPaginationIcon } from './leftArrowPaginationIcon.svg'
import { ReactComponent as LockIcon } from './lock.svg'
import { ReactComponent as MaximizeIcon } from './maximizeIcon.svg'
import { ReactComponent as MinimizeIcon } from './minimizeIcon.svg'
import { ReactComponent as PauseIcon } from './pause.svg'
import { ReactComponent as PlayIcon } from './play.svg'
import { ReactComponent as ProfileIcon } from './profileIcon.svg'
import { ReactComponent as ResetIcon } from './reset.svg'
import { ReactComponent as RightArrowPaginationIcon } from './rightArrowPaginationIcon.svg'
import { ReactComponent as RunIcon } from './run.svg'
import { ReactComponent as SearchIcon } from './searchIcon.svg'
import { ReactComponent as TickIcon } from './tickIcon.svg'
import { ReactComponent as TodoIcon } from './todoIcon.svg'
import { ReactComponent as UpArrowPaginationIcon } from './upArrowPaginationIcon.svg'

export const Todo = memo(TodoIcon)
export const Minimize = memo(MinimizeIcon)
export const HamburgerMenu = memo(HamburgerMenuIcon)
export const Maximize = memo(MaximizeIcon)
export const Profile = memo(ProfileIcon)
export const DownArrowPagination = memo(DownArrowPaginationIcon)
export const LeftArrowPagination = memo(LeftArrowPaginationIcon)
export const UpArrowPagination = memo(UpArrowPaginationIcon)
export const RightArrowPagination = memo(RightArrowPaginationIcon)
export const Search = memo(SearchIcon)
export const Tick = memo(TickIcon)
export const Filter = memo(FilterIcon)
export const Attempted = memo(AttemptedIcon)
export const Lock = memo(LockIcon)
export const Play = memo(PlayIcon)
export const Pause = memo(PauseIcon)
export const Reset = memo(ResetIcon)
export const Run = memo(RunIcon)
