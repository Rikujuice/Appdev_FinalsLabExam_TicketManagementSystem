import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, tickets }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Tickets</h2>}
        >
            <Head title="Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Flash message display[cite: 3] */}
                    {flash.message && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                            {flash.message}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Support Tickets</h3>
                            <Link href={route('tickets.create')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                New Ticket
                            </Link>
                        </div>

                        {/* Friendly empty state when the user has no tickets[cite: 3] */}
                        {tickets.data.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                You have no tickets yet. Click "New Ticket" to create one!
                            </div>
                        ) : (
                            <div>
                                {/* Desktop Table View[cite: 3] */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tickets.data.map((ticket) => (
                                                <tr key={ticket.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{ticket.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                            {ticket.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            {ticket.priority}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link href={route('tickets.show', ticket.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">View</Link>
                                                        <Link href={route('tickets.edit', ticket.id)} className="text-green-600 hover:text-green-900">Edit</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Stacked Cards View[cite: 3] */}
                                <div className="md:hidden space-y-4">
                                    {tickets.data.map((ticket) => (
                                        <div key={ticket.id} className="bg-white border rounded-lg p-4 shadow-sm">
                                            <h4 className="font-bold text-lg mb-2">{ticket.title}</h4>
                                            <div className="flex space-x-2 mb-3">
                                                <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">{ticket.status}</span>
                                                <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">{ticket.priority}</span>
                                            </div>
                                            <div className="flex space-x-4 mt-2 border-t pt-2">
                                                <Link href={route('tickets.show', ticket.id)} className="text-indigo-600 font-medium">View</Link>
                                                <Link href={route('tickets.edit', ticket.id)} className="text-green-600 font-medium">Edit</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination (10 per page)[cite: 2] */}
                                <div className="mt-6 flex justify-between items-center">
                                    {tickets.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}