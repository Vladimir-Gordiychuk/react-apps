import React from 'react';

import StlModel from '../viewer/StlModel';

export default class StlInput extends React.Component {

    handleFileInput = (e) => {    
        var file = e.target.files[0];
        if (!file) {
          return;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          var model = new StlModel();
          model.readArrayBuffer(e.target.result);
          this.props.onModelChange(model);

        };
        reader.readAsArrayBuffer(file);
      }

    render() {
        return <input type="file" onInput={this.handleFileInput} />
    }

};