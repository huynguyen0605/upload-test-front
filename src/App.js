import React, { Component } from 'react';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
    };
    onChangeHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.selectedFile[0],
        })
    };
    onClickHandler = () => {
        const data = new FormData();
        data.append("file", this.state.selectedFile);
    };
    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="col-md-6">
                        <form method="post" action="#" id="#">
                            <div className="form-group files color">
                                <label>Upload Your File </label>
                                <input type="file" className="form-control" multiple=""
                                    onChange={this.onChangeHandler} />
                            </div>
                        </form>
                    </div>
                    <button type="button" className="btn btn-success btn-block"
                        onClick={this.onClickHandler}>Upload</button>
                </div>
            </div>
        );
    }
}

export default App;
