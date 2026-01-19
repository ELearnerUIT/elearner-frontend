import Link from "next/link";
import React from "react";

export enum ButtonColor {
    PURPLE,
    WHITE
}

const color_infos: Record<ButtonColor, { bg_normal: string, bg_hover: string, bg_active: string, bg_disable: string, border: string, text: string }> = {
    [ButtonColor.PURPLE]: {
        bg_normal: "bg-[rgba(99,102,241,1)]",
        bg_hover: "hover:bg-[rgba(80,71,217,1)]",
        bg_active: "active:bg-[rgba(60,60,194,1)]",
        bg_disable: "bg-[rgb(170,170,241)]",
        border: "border-[rgba(99,102,241,1)]",
        text: "text-white"
    },
    [ButtonColor.WHITE]: {
        bg_normal: "bg-white",
        bg_hover: "hover:bg-[rgba(224,224,255,1)]",
        bg_active: "active:bg-[rgba(200,200,255,1)]",
        bg_disable: "bg-white",
        border: "border-[rgba(99,102,241,1)]",
        text: "text-[rgba(99,102,241,1)]"
    }
};

const get_color_class = (color: ButtonColor, enabled: boolean) => {
    let color_info = color_infos[color];
    const default_color_class = "bg-[rgba(99,102,241,1)] hover:bg-[rgba(80,71,217,1)] active:bg-[rgba(60,60,194,1)] border-[rgba(99,102,241,1)] text-white";
    if (color_info) {
        return (enabled ? (color_info.bg_normal + " " + color_info.bg_hover + " " + color_info.bg_active) : color_info.bg_disable) + " " + color_info.border + " " + color_info.text;
    }
    else {
        return default_color_class;
    }
}

const default_custom_button_props = {
    text: "",
    enabled: true,
    color: ButtonColor.PURPLE,
    width: "w-full",
    height: "",
    rounded: "rounded-lg",
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => { }
}

export function CustomButton(
    {
        text = default_custom_button_props.text,
        enabled = default_custom_button_props.enabled,
        color = default_custom_button_props.color,
        width = default_custom_button_props.width,
        height = default_custom_button_props.height,
        rounded = default_custom_button_props.rounded,
        onClick = default_custom_button_props.onClick,
        children = null
    }: {
        children?: React.ReactNode,
        text?: string,
        enabled?: boolean,
        color?: ButtonColor,
        width?: string,
        height?: string,
        rounded?: string,
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    }
) {

    let color_class = get_color_class(color, enabled);

    return (
        <button
            type="button"
            disabled={!enabled}
            className={`${width} ${height} border ${color_class} font-normal py-2 px-4 ${rounded} flex justify-center items-center gap-2 transition ${!enabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={(event) => enabled && onClick(event)}
        >
            {children}
            {text}
        </button>
    )
}

const default_custom_link_button_props = {
    text: "",
    enabled: true,
    color: ButtonColor.PURPLE,
    width: "w-full",
    height: "",
    rounded: "rounded-lg",
    href: "/"
}

export function CustomLinkButton({
    text = default_custom_link_button_props.text,
    enabled = default_custom_link_button_props.enabled,
    color = default_custom_link_button_props.color,
    width = default_custom_link_button_props.width,
    height = default_custom_link_button_props.height,
    rounded = default_custom_link_button_props.rounded,
    href = default_custom_link_button_props.href,
    children = null
}: {
    children?: React.ReactNode,
    text?: string,
    enabled?: boolean,
    color?: ButtonColor,
    width?: string,
    height?: string,
    rounded?: string,
    href?: string
}) {

    let color_class = get_color_class(color, enabled);

    return (
        <Link href={href} className={`${width} ${height} border ${color_class} font-normal py-2 px-4 ${rounded} flex justify-center items-center gap-2 transition`}>
            {text}
            {children}
        </Link>
    )
}