import React from 'react'

const Item = ({
    canvasRefs,
    imageRefs,
    imageSrc,
    canWidthHeight,
    onMouseUp,
    onMouseDown,
    onMouseMove,
    selectedFile
}) => {
    const {width,height}=canWidthHeight;
    return (
        <React.Fragment>
            <canvas ref={canvasRefs}
                    id="canvas"
                    width={width}
                    height={height}
                    onMouseUp={onMouseUp}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    className="crop">
            </canvas>
            {selectedFile &&
            <img ref={imageRefs}
                 id="preview"
                 width="auto"
                 height="auto"
                 src={imageSrc}
                 alt="preview" style={{visibility:'visible',maxWidth:'100%'}}
            />}
        </React.Fragment>
    )
};

export default Item