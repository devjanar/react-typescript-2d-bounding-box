export const fillTextX=5;
export const fillTextY=15;
//
export const getMousePos=(canvas:any, evt:any)=> {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};
