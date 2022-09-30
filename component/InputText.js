import React from "react";

const Add = (prop) => {
    return(
        <div className="main-container">
            <input type="text"
                    className="search"
                    placeholder={prop.textPlaceHolder}
                    maxLength={prop.maxLength}
                    >
                
            </input>
        </div>
    );
}

export default Add;