import React from 'react';
import Canvas from "./Canvas";
import {Link} from "react-router-dom";
import './style.css'

const List = ({lists}) => {
    return (
        <ul className="itemList">
            {
                lists.map((item,index)=>{
                    return(
                        <li key={index}>
                            <Link to={`/preview/${item._id}`}>
                                <Canvas {...item}/>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default List