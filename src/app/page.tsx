export default async function Home() {
    // to test docker build
    const response = await fetch("https://google.com");

    return (
        <main className="xs:text-red-500 bg-white text-black md:text-blue-500">
            home page
            <div>response code: {response.status}</div>
        </main>
    );
}
