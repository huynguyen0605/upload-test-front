import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            fileList: [],
        };
    };

    componentDidMount() {
        this.loadFileList();
    };

    loadFileList = () => {
        axios.get('http://localhost:8000/fileLists').then(res => {
            if (res.data && res.data.length > 0) {
                console.log('huynvq::==========>fileListRes', res.data);
                this.setState({
                    fileList: res.data,
                });
            };
        }).catch(err => {
            console.log('huynvq::=====>', err);
        });
    };

    onChangeHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
        })
    };
    onClickHandler = () => {
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        axios.post('http://localhost:8000/upload', data).then(res => {
            console.log('huynvq::=======>uploadRes', res);
            this.loadFileList();
        }).catch(err => {
        });
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
                    <div>
                        {this.state.fileList.map(file => {
                            return (
                                <div key={file}>
                                    <a
                                        href={'http://localhost:8000/download/' + file}
                                    >
                                        {file}
                                    </a>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
