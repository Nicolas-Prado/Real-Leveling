import styled from "./../styles/components/styledBorder.module.scss"
import { CSSProperties } from 'react';

export default function StyledBorder({
    bg,
    border,
    borderSize,
    isUrl,
    borderRadius,
    children
}: {
    bg: string,
    border: string,
    borderSize: string,
    isUrl: string,
    borderRadius: string,
    children: React.ReactNode
}){

    return <div className={styled['styled-border']} style={{
        "--bg": `${bg}`,
        "--border": `${border}`,
        "--border-size": `${borderSize}`,
        "--is-url": `"${isUrl}"`,
        "--border-radius": `${borderRadius}`
    } as CSSProperties}>{children}</div>
}