import React, {useEffect} from 'react'
import {fillTextX,fillTextY} from '../../services/service'
import {InterCanvasProps,} from './InterfaceTypes'

const Canvas = (props:InterCanvasProps) => {
    useEffect(()=>{
        if (props && props._id) {
            var canvas = document.getElementById(`${props._id}`) as HTMLCanvasElement;
            let ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
            if(ctx){
                var img = new Image();
                img.src = props.imgSrc!;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                //
                img.onload = function () {
                    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
                    ctx.beginPath();
                    if (props.strokeRect && props.strokeRect.length) {
                        props.strokeRect.forEach((item2:any) => {
                            ctx.lineWidth = item2.lineWidth;
                            ctx.strokeStyle = item2.strokeStyle;
                            ctx.fillStyle = item2.fillStyle;
                            ctx.font = item2.font;
                            ctx.fillText(item2.fillText,  item2.last_mousex+fillTextX, item2.last_mousey+fillTextY);
                            ctx.strokeRect(item2.last_mousex, item2.last_mousey, item2.width, item2.height);
                        })
                    }
                };
            }
        }
    },[props]);
    return (
        <React.Fragment>
            <canvas id={props._id} width={props.width} height={props.height}></canvas>
        </React.Fragment>
    )
};

export default Canvas