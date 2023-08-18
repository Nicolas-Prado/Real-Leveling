'use client'
import styled from "./../styles/utils.module.scss"
import React, { CSSProperties, useEffect, useRef, useState } from "react";

export default function StyledBorder({
    background,
    border,
    borderRadius,
    firstDimension,
    secondDimension,
    isFourCorner,
    children
}: {
    background: string,
    border: string,
    borderRadius: string,
    firstDimension: string,
    secondDimension: string,
    isFourCorner: boolean
    children: React.ReactNode
}) {
    const element = useRef<HTMLDivElement>(null)
    const [ dimensions, setDimensions ] = useState<number[]|null>(null)

    useEffect(() => {
        const divElement = element.current
        if(!divElement)
            return

        const rect = divElement.getBoundingClientRect()
        setDimensions([rect.x, rect.y, rect.width, rect.height])
    }, [element, dimensions])

    return <div ref={element} id="" className={isFourCorner ? styled['four-corner-border'] : styled['two-corner-border']} style={{
        "--background": `${background}`,
        "--border": `${border}`,
        "--border-radius": `${borderRadius}`,
        "--is-url": background.includes('url') ? "true" : "false",
        "--first-dimension": `${firstDimension}`,
        "--second-dimension": `${secondDimension}`,
        "--x-position": `${dimensions ? dimensions[0] : 0}`,
        "--y-position": `${dimensions ? dimensions[1] : 0}`,
        "--width": `${dimensions ? dimensions[2] : 0}`,
        "--height": `${dimensions ? dimensions[3] : 0}`,
    } as CSSProperties}>
        {children}
    </div>
}