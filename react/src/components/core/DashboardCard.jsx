export default function DashboardCard({ title, children, className = "",style }) {
    return (
        <div
        style={style}
            className={
                `flex flex-col shadow-md mb-3  p-3 bg-white hover:bg-gray-100 transition-colors rounded-sm animate-fade-in-down` +
                className
            }
        >
            {title && (
                <h3 className="text-2xl font-bold text-center">{title}</h3>
            )}
            {children}
        </div>
    );
}
