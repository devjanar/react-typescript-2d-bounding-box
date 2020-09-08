import React, {useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import {
    useParams
} from "react-router-dom";
import Canvas from "./common/Canvas";
import {connect} from "react-redux";
import {InterData} from "../actions/InterfaceTypes";
import {findOneItems} from '../actions/boundingboxAction'
import {InterStoreState} from '../reducers/rootReducer'

interface ParamTypes {
    boundingbox:InterData[],
    findOneItems:(id: string) => void,
}

const Preview = (props:ParamTypes): JSX.Element => {
    let {id}  = useParams() as any;
    const [state, setState] = useState<InterData[] | any>();

    useEffect(()=>{
        props.findOneItems(id);// eslint-disable-next-line
    },[id]);

    useEffect(()=>{
        setState(props.boundingbox)
    },[props.boundingbox]);

    //
    return (
        <React.Fragment>
            <div className="container">
                <div className="commonWrapper">
                    <div style={{marginBottom:'30px',overflow:'hidden'}}>
                        <strong style={{fontSize: '25px'}}>Image Labelling</strong>
                        <Link to="/" className="btn btn-info pull-right" style={{minWidth: '166px'}}>
                            Back
                        </Link>
                    </div>
                   <Canvas {...state}/>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps=(state:InterStoreState):{boundingbox:InterData[]}=>{
    return {
        boundingbox: state.boundingbox
    }
};

export default connect(mapStateToProps,{findOneItems})(Preview);