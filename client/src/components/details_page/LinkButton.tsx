export default function LinkButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className="bg-[#394788] flex items-center text-white px-6 py-3 gap-3 rounded-lg shadow-lg hover:bg-[#394788]/90 hover:shadow-xl active:scale-95 transition-all duration-200"
            {...props}
        >
            {children}
        </button>
    )
}
