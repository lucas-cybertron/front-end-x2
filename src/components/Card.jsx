export const Card = ({children, className = '', ...props}) => {
    return(
        <div
        className={`bg-white shadow-lg w-full overflow-hidden rounded-2xl p-6 ${className}`}
        {...props}
        >
        {children}
        </div>
    );
};