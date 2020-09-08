import React from "react";

export interface InterState {
    fillText:string,
    last_mousex:number,
    last_mousey:number,
    isDrawWarining:boolean,
}
export interface InterStrokeRect {
    last_mousex:number,
    last_mousey:number,
    width:number,
    height:number,
    fillText:string
}
export interface InterCanWidthHeight{
    width:number,
    height:number,
}
export interface InterCanvasProps {
    height: number,
    _id: string,
    imgSrc: string,
    strokeRect: Array<any>,
    width: number,
}
export interface InterInputProps {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    onChange:(e: InterChangeEvent['e'])=>void,
    className: string,
    value: string,
}
export interface InterChangeEvent {
    e: React.ChangeEvent<HTMLInputElement>
}
export interface InterFormEvent {
    e: React.FormEvent<HTMLInputElement>
}