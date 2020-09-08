import React from "react";
import {connect} from "react-redux";
import {InterStoreState} from './reducers/rootReducer'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ItemList from './components/ItemList'
import AddItem from './components/AddItem'
import Preview from './components/Preview'

const App=({...props})=> {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <ItemList />
                    </Route>
                    <Route path="/add">
                        <AddItem />
                    </Route>
                    <Route path="/preview/:id">
                        <Preview />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

function mapStateToProps(state:InterStoreState){
    return {
        state: state
    }
}

export default connect(mapStateToProps,{}) (App);