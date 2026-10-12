import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    // Use Inertia's useForm helper for forms[cite: 2]
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        priority: 'Low',
        category: 'Hardware',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Ticket</h2>}
        >
            <Head title="Create Ticket" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {/* Inline validation errors[cite: 3] */}
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                ></textarea>
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="priority" value="Priority" />
                                    <select
                                        id="priority"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                    <InputError message={errors.priority} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="category" value="Category" />
                                    <select
                                        id="category"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                    >
                                        <option value="Hardware">Hardware</option>
                                        <option value="Software">Software</option>
                                        <option value="Network">Network</option>
                                        <option value="Account">Account</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <InputError message={errors.category} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Disabled submit button while the form is processing[cite: 3] */}
                                <PrimaryButton disabled={processing}>
                                    Submit Ticket
                                </PrimaryButton>
                                <Link href={route('tickets.index')} className="text-gray-600 hover:text-gray-900">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}