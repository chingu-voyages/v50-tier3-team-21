export default function FooterComponent() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-white m-4 left-0 z-20 w-full">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <hr className="my-6 border-primary border-2 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-dark sm:text-center">&copy; {currentYear} <a href="/" className="hover:underline">Hungry Hippo.</a> All rights reserved.</span>
            </div>
        </footer>


    )
}
