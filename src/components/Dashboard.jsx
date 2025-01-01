import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div>

            <h1 className='text-center'>DashBoard</h1>

            <div className='flex flex-col gap-5 lg:flex-row justify-center'>
                <div className='flex flex-col gap-5 items-center border-2 border-[#D9D9D9] rounded-xl p-4 h-fit'>
                    <NavLink to="add-marathon" className={({ isActive }) => isActive ? 'bg-purple-500 rounded-full p-2 text-white' : 'p-2 bg-[#D9D9D9] rounded-full'}><button>Add Marathon</button></NavLink>
                    <NavLink to="my-marathon-list" className={({ isActive }) => isActive ? 'bg-purple-500 rounded-full p-2 text-white' : 'p-2 bg-[#D9D9D9] rounded-full'}><button>My MarathonList</button></NavLink>
                    <NavLink to="my-apply-list" className={({ isActive }) => isActive ? 'bg-purple-500 rounded-full p-2 text-white' : 'p-2 bg-[#D9D9D9] rounded-full'}><button>My Apply List</button></NavLink>
                </div>

                <div><Outlet></Outlet></div>
            </div>

        </div>
    )
}
