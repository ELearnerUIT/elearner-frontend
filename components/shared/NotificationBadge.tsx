export default function NotificationBadge(props: {
    className?: string,
    show?: boolean
} = { className: "", show: false }) {
    return (
        <div className={props.className} hidden={!props.show}>
            <div className="bg-red-500 rounded-full text-white w-3 h-3">
            </div>
        </div>

    )
}