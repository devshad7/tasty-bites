import Link from 'next/link'
import UserMenu from './UserMenu'

const Navbar = ({ user }) => {
    return (
        <>
            <div className="flex justify-between items-center py-5 border-b border-white px-8 md:px-28">
                <div className="font-semibold text-2xl">
                    <Link href={'/dashboard'}>
                        Tasty Bites
                    </Link>
                </div>
                <div>
                    <UserMenu user={user} />
                </div>
            </div>
        </>
    )
}

export default Navbar