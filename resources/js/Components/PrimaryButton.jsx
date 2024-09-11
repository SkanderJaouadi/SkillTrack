export default function ToggleButton({ className = '', isToggled = false,  children, disabled, ...props }) {
    return (
        <button
            {...props}
            
            className={`inline-flex items-center px-6 py-3 font-medium text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${isToggled ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
