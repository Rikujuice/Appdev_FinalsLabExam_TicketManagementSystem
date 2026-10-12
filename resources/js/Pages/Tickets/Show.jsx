import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, ticket }) {
    const handleDelete = () => {
        // Ask the user to confirm before deleting[cite: 2]
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ticket Details</h2>}
        >
            <Head title={`Ticket - ${ticket.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="border-b pb-4 mb-4 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{ticket.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">Category: {ticket.category}</p>
                            </div>
                            <div className="flex gap-2">
                                {/* Color-coded badges for priority and status */}
                                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {ticket.status}
                                </span>
                                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                                    {ticket.priority}
                                </span>
                            </div>
                        </div>

                        <div className="prose max-w-none text-gray-700 mb-8 whitespace-pre-wrap">
                            {ticket.description}
                        </div>

                        <div className="flex justify-end gap-4 border-t pt-4 mt-6">
                            <Link
                                href={route('tickets.edit', ticket.id)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}