import React, {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import List from './common/List'
import {InterData} from "../actions/InterfaceTypes";
import {fetchHandler} from '../actions/boundingboxAction'
import {InterStoreState} from '../reducers/rootReducer'

interface ItemListProps{
    boundingbox:InterData[],
    fetchHandler():any,
}

const ItemList = (porps:ItemListProps) => {
    const [state, setState] = useState<InterData[]>();
    useEffect(()=>{
        porps.fetchHandler();// eslint-disable-next-line
    },[]);
    useEffect(()=>{
        setState(porps.boundingbox);
    },[porps]);
    //
    return (
        <React.Fragment>
            <div className="container">
                <div className="commonWrapper">
                    <div style={{marginBottom:'30px',overflow:'hidden'}}>
                        <strong style={{fontSize: '25px'}}>Bounding Box Image Labelling</strong>
                        <Link to="/add" className="btn btn-info pull-right" style={{minWidth: '166px'}}>
                            add
                        </Link>
                    </div>
                    {state && state.length ? <List lists={state}/>:null}
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

export default connect(mapStateToProps,{fetchHandler})(ItemList);