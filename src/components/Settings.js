import React from 'react'
import { Separator } from './ui/separator'
import ProfileSettings from './ProfileSettings'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'

const Settings = ({ user }) => {

    const pathname = usePathname()

    const sidebarNavItems = [
        {
            title: "Profile",
            href: "/dashboard/settings",
        },
        {
            title: "Account",
            href: "",
        },
        {
            title: "Appearance",
            href: "",
        },
        {
            title: "Notifications",
            href: "",
        },
        {
            title: "Display",
            href: "",
        },
    ]

    return (
        <>
            <div className=" space-y-6 px-8 md:px-28 md:py-10 md:block">
                <div className="space-y-0.5 md:block hidden">
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <Separator className="my-6 md:block hidden" />
                <div className="flex flex-col md:flex-row md:space-x-20 md:space-y-0">
                    <aside className="-mx-4 md:w-1/5 md:block hidden">
                        <nav
                            className={cn(
                                "flex flex-col md:flex-col md:space-x-0 md:space-y-1"
                            )}
                        >
                            {sidebarNavItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        pathname === item.href
                                            ? "bg-main-nav hover:bg-muted"
                                            : "hover:bg-transparent hover:underline",
                                        "justify-start"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                    <div className="flex-1 md:max-w-2xl">
                        <ProfileSettings user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings