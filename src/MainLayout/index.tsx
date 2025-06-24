import { Link, React } from 'src/deps'
const { memo } = React
import Icons from 'src/assets/svg'
import { logoutActionDispatcher } from 'src/features/auth/auth.dispatcher'

const Header = () => (
	<header className="sticky top-0 z-40 flex w-full flex-wrap border-b border-gray-300 bg-white text-sm md:flex-nowrap md:justify-start">
		<nav className="mx-auto flex w-full max-w-[85rem] basis-full items-center justify-between px-4 sm:px-6 lg:px-8">
			<div className="me-5">
				<Link
					className="inline-block flex-none rounded-md text-xl font-semibold focus:outline-none"
					to="/"
				>
					MongoAcademy
				</Link>
			</div>

			<div className="flex items-center gap-4">
				<button
					onClick={logoutActionDispatcher}
					className="my-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
				>
					<Icons.Images16.Logout />
					Logout
				</button>
			</div>
		</nav>
	</header>
)

const MemoizedHeader = memo(Header)

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<MemoizedHeader />
			<div className="flex grow bg-brand-bg p-2">
				<div className="grow rounded-md">{children}</div>
			</div>
		</div>
	)
}

export default MainLayout
