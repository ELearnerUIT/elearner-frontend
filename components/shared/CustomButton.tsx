export enum ButtonColor {
    PURPLE,
    WHITE
}

const color_infos = new Map<ButtonColor, { bg_normal: string, bg_hover: string, bg_active: string, bg_disable: string, border: string, text: string }>([
    [ButtonColor.PURPLE, {
        bg_normal: "bg-[rgba(99,102,241,1)]",
        bg_hover: "hover:bg-[rgba(80,71,217,1)]",
        bg_active: "active:bg-[rgba(60,60,194,1)]",
        bg_disable: "bg-purple-300",
        border: "border-[rgba(99,102,241,1)]",
        text: "text-white"
    }],
    [ButtonColor.WHITE, {
        bg_normal: "bg-white",
        bg_hover: "hover:bg-[rgba(99,102,241,0.05)]",
        bg_active: "active:bg-[rgba(99,102,241,0.1)]",
        bg_disable: "bg-[rgba(240,240,240,1)]",
        border: "border-[rgba(99,102,241,1)]",
        text: "text-[rgba(99,102,241,1)]"
    }]
]);


export default function CustomButton(props: {
    text: string,
    enabled: boolean,
    color: ButtonColor,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {

    let color_info = color_infos.get(props.color);
    let color_class = "";

    if (color_info) {
        color_class = (props.enabled ? (color_info.bg_normal + " " + color_info.bg_hover + " " + color_info.bg_active) : color_info.bg_disable) + " " + color_info.border + " " + color_info.text;
    }

    console.log("CustomButton render with color_class =", color_class);

    return (
        <button className={`w-full border ${color_class} font-normal py-2 px-4 rounded-lg flex justify-center gap-2 transition`}
            onClick={(event) => props.onClick(event)}>
            {props.text}
            <span>→</span>
        </button>
    )
}