import React  from 'react';

function Navigator(props) {
    return (
    <div className="Navigator">
        <nav className="navbar navbar-white bg-white" >
                <a href="#" className="text-dark">
                    {props.Titulo}
                    <span className="badge badge-pill badge-dark ml-2">{props.ntareas}</span>

                </a>
                  
          </nav> 
    </div>
    );
  }
  
  export default Navigator;

  