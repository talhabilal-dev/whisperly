import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-200 mb-4">
                        Welcome to Whisperly
                    </h1>
                    <p className="text-lg text-gray-100 mb-6">
                        Your Laravel version is {laravelVersion} and PHP version
                        is {phpVersion}.
                    </p>
                    {auth.user ? (
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
