export const LoadingSpinner = ({size = 'md'}) => {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-16 h-16'
    }
    return (
        <div className="flex justify-center items-center">
            <div 
                className={`${sizes [size]} border-light/30 border-t-light rounded-full animate-spin`}
            ></div>
        </div>
    )
}