import React, {Fragment} from "react";
import './Main.css'
import Header from "./Header";

export default props =>
    <Fragment>
        <Header {...props}/>
        <main className="content">
            <div>
                {props.children}
            </div>
        </main>
    </Fragment>