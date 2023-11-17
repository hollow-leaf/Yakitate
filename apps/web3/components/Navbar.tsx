import React from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { Wallet } from '@/service/perawallet'

const navigation = [
    { name: 'Provider', href: '/provider', current: true },
    { name: 'Receiver', href: '/receiver', current: false },
]

export default function Navbar() {
    return (
        <Disclosure as="nav" className="flex h-16 w-screen bg-gray-800">
            {({ open }: any) => (
                <>
                    <div className="px-2 sm:px-6 lg:px-8 w-full">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Image src='/logo.svg' alt="Logo" width={40} height={40} />
                                <Link href='/' className="text-white ml-2">Yakitate</Link>
                            </div>
                            <div className="hidden sm:flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className='flex items-center'>
                                <Wallet />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
