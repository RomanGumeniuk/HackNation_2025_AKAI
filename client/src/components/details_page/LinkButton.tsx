export default function LinkButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className="bg-[#394788] flex text-white p-1.5 gap-3 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all"
            {...props}
        >
            {children}
        </button>
    )
}
