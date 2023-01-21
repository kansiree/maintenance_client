import React, { forwardRef } from "react";

const Add = (prop,ref) => {
    return(
        <div className="main-container">
            <input type="text" ref={ref}
                    className="search"
                    placeholder={prop.textPlaceHolder}
                    maxLength={prop.maxLength}
                    >
                
            </input>
        </div>
    );
}

export default forwardRef(Add)