const Footer = () => {
    return (
        <footer className="mt-16 border-t border-[#1f1f23] bg-[#070708]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold tracking-wider text-white">
                            FLICK<span className="text-brand">.</span>
                        </span>
                        <span className="text-xs text-text-muted">Movie Explorer</span>
                    </div>
                    <p className="text-sm text-text-muted">
                        &copy; {new Date().getFullYear()} FLICK. Built with passion for movies.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
