import React, {useState, useEffect, useRef} from 'react';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import {connect} from "react-redux";
import {InterData} from "../actions/InterfaceTypes";
import {createItem} from '../actions/boundingboxAction'
import {InterStoreState} from '../reducers/rootReducer'
import {
    InterState,
    InterStrokeRect,
    InterCanWidthHeight,
    InterChangeEvent,
    InterFormEvent,
} from './common/InterfaceTypes'
import Labelling from './common/Labelling'
import InputForm from './common/InputForm'
import {
    getMousePos,
    fillTextX,fillTextY,
} from '../services/service'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let mousedown:boolean = false;
let last_mousex:number = 0;
let last_mousey:number = 0;
let width:number = 0;
let height:number = 0;

interface PropsTypes {
    boundingbox:InterData[],
    createItem:(data: any) => void,
}


const AddItem = (props:PropsTypes) => {
    let history = useHistory();
    const [state, setState] = useState<InterState>({
        fillText:"",
        last_mousex:0,
        last_mousey:0,
        isDrawWarining:false,
    });

    const canvasRefs = useRef<HTMLCanvasElement>(null);
    const imageRefs = useRef<HTMLImageElement>(null);
    const [context, setContext] = useState<any>(null);
    const [strokeRect, setStrokeRect] = useState<InterStrokeRect[]>([
        {last_mousex:0, last_mousey:0, width:0, height:0,fillText:'' }
    ]);
    const [photo, setPhoto] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<boolean>();
    const [canWidthHeight, setCanWidthHeight] = useState<InterCanWidthHeight>({
        width:0,
        height:0
    });
    //Replace Photo To Canvas
    useEffect(() => {
        if(photo){
            setTimeout(()=>{
                let canvas = canvasRefs.current as HTMLCanvasElement;
                let ctx : CanvasRenderingContext2D = canvas.getContext('2d')!;
                let img = imageRefs.current as HTMLImageElement;
                setCanWidthHeight({
                    width:img.clientWidth+10,
                    height:img.clientHeight+10
                });
                img.src=photo!;
                img.onload = function(){
                    ctx.drawImage(img,0,0,canvas.width, canvas.height);
                };
                setSelectedFile(false)
            })
        }
    }, [photo]);
    //Load Canvas & Paint Rectangular With Text
    useEffect(()=>{
        if (canvasRefs.current) {
            const renderCtx = canvasRefs.current.getContext('2d');
            if (renderCtx) {
                setContext(renderCtx);
            }
            if (context && strokeRect && strokeRect.length) {
                context.beginPath();
                strokeRect.forEach((item:InterStrokeRect)=>{
                    context.fillText(item.fillText,  item.last_mousex+fillTextX, item.last_mousey+fillTextY);
                    context.strokeRect(item.last_mousex, item.last_mousey, item.width, item.height);
                })
            }
        }
    },[context,strokeRect]);
    //
    //
    const onSelectFile = (e: InterFormEvent['e']) => {
        const target = e.target as HTMLInputElement;
        if (!target.files || target.files.length === 0) {
            setSelectedFile(undefined);
            return
        }
        if(target.files && target.files[0]){
            let file = target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                setPhoto(reader.result as string);
                setSelectedFile(true)
            };
            reader.readAsDataURL(file);
        }
    };
    //
    const onChangeHandle = (e: InterChangeEvent['e']):void => {
        const target = e.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setState({...state,[name]: value});
    };
    //
    const handleMouseDown = (e: InterChangeEvent['e']) => {
        let canvas = canvasRefs.current;
        let mousePos = getMousePos(canvas, e);
        last_mousex=mousePos.x;
        last_mousey=mousePos.y;
        mousedown = true;
    };
    //
    const handleMouseUp = (e: InterChangeEvent['e']) => {
        mousedown = false;
    };
    //
    const handleMouseMove = (e: InterChangeEvent['e']) => {
        let canvas = canvasRefs.current as HTMLCanvasElement;
        let ctx = canvas.getContext('2d')!;
        let mousex = 0;
        let mousey = 0;
        //
        let mousePos = getMousePos(canvas, e);
        mousex = mousePos.x;
        mousey = mousePos.y;
        //
        var img=new Image();
        img.src=photo!;
        //
        if(mousedown) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            width = mousex - last_mousex;
            height = mousey - last_mousey;
            ctx.strokeRect(last_mousex, last_mousey, width, height);
            state.last_mousex=last_mousex;
            state.last_mousey=last_mousey;
            state.isDrawWarining=false;
            setState({...state});
            //Paint Rectangular With Text
            if(strokeRect && strokeRect.length){
                strokeRect.forEach((item:InterStrokeRect)=>{
                    ctx.fillText(item.fillText,  item.last_mousex+fillTextX, item.last_mousey+fillTextY);
                    ctx.strokeRect(item.last_mousex, item.last_mousey, item.width, item.height);
                })
            }
        }
    };
    //
    const addHandler = () => {
        if(width && height){
            const {last_mousex,last_mousey}=state;
            setStrokeRect([...strokeRect, {last_mousex, last_mousey, width, height,fillText:state.fillText }]);
            toast.success('Success! Rectangular boxes added.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            setState({...state,isDrawWarining:true});
        }
    };
    //
    const submitHandler = async () => {
        let item={
            imgSrc:photo,
            width:canWidthHeight.width,
            height:canWidthHeight.height,
            strokeRect:strokeRect
        };
        if(item && item.imgSrc
            && item.width && item.height){
            //
            let promise=props.createItem(item);
            Promise.resolve(promise).then((response)=>{
                history.push("/");
            }).catch((error)=>{
                alert(error)
            })
        }
        else {
            alert("Image is Required")
        }
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="commonWrapper">
                    <div style={{marginBottom:'30px',overflow:'hidden'}}>
                        <strong style={{fontSize: '25px'}}>Image Labelling</strong>
                        <button className="btn btn-info pull-right" style={{minWidth: '166px',marginLeft:'0.5rem'}} onClick={submitHandler}>
                            Save
                        </button>
                        <Link to="/" className="btn btn-info pull-right" style={{minWidth: '166px'}}>
                            Back
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="btn btn-info" style={{width: '100%'}} htmlFor="file">
                                upload File
                                <input id="file" type='file' className="inputfile" onChange={onSelectFile} />
                            </label>
                            <button className="btn btn-warning" style={{width: '100%'}} onClick={addHandler}>
                                Add
                            </button>
                        </div>
                        <div className="col-sm-3"> </div>
                        <div className="col-sm-6">
                            <div>
                                <InputForm
                                    label="Text"
                                    name="fillText"
                                    type="text"
                                    placeholder="Enter"
                                    onChange={onChangeHandle}
                                    className="form-control"
                                    value={state.fillText}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="contentWrapper">
                        <div className="form-group">
                            {state.isDrawWarining &&
                                <p className="alert-danger">
                                    Please draw rectangular boxes over certain objects in the uploaded image, and then add.
                                </p>
                            }
                            <Labelling
                                canvasRefs={canvasRefs}
                                imageRefs={imageRefs}
                                imageSrc={photo}
                                canWidthHeight={canWidthHeight}
                                onMouseUp={handleMouseUp}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                selectedFile={selectedFile}
                            />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </React.Fragment>
    );
};


const mapStateToProps=(state:InterStoreState):{boundingbox:InterData[]}=>{
    return {
        boundingbox: state.boundingbox
    }
};


export default connect(mapStateToProps,{createItem})(AddItem);