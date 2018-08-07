import React, { Component } from 'react';
import $ from 'axios';
import Cell from './components/cell';
import './App.css';

class App extends Component {

    state = {
        imageRow1: [],
        imageRow2: []
    }

    componentDidMount() {
        $.get("https://picsum.photos/list")
            .then(res => {
                let images = res.data
                // randomize returned images and grab 18 for use
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 18)
                    .map((x, i) => {
                        return {
                            id: x.id,
                            gray: `https://picsum.photos/g/512/288/?image=${x.id}`,
                            color: `https://picsum.photos/512/288/?image=${x.id}`,
                            //enlarge two images to start
                            enlarged: i === 3 || i === 10 ? true : false
                        }
                    })
                //split images into two arrays, one for each container
                this.setState({
                    imageRow1: images.slice(0, 9),
                    imageRow2: images.slice(9, 18)
                });
            })
    }
    //function to pass down for mouseover behavior
    sizeUp = (e) => {
        //grab info for row/id# and determine which array in state to update
        let id = e.target.getAttribute("data-img-id")
        let rowNum = e.target.getAttribute("data-row");
        let imgRw = "imageRow" + rowNum;
        let stateImgArr = this.state[imgRw];

        //declare variables to store target and previous target
        let focusItemIndex;
        let prevEnlargedIndex;

        //iterate over images in container
        let enlargedItemArr = stateImgArr.map((x, i) => {
            //find currently enlarged img
            if(x.enlarged) prevEnlargedIndex = i;
            //enlarge target
            id === x.id.toString() ? x.enlarged = true : x.enlarged = false;
            //store target index
            if(id === x.id.toString()) focusItemIndex = i;
            return x;
        })

        //if target is on bottom row of imgs,
        //splice focused item into array to display in top row
        //below algorithm keeps the enlarged image under the mouse cursor
        //while maintaining the shape of the original container
        //if focused - prev = 4, place 5 indicies earlier
        //else place 4 indicies earlier
        if(focusItemIndex > 4) {
            let moveTo;
            let shiftImg = enlargedItemArr.splice(focusItemIndex, 1);
            if(focusItemIndex - prevEnlargedIndex === 4) {
                moveTo = focusItemIndex - 5;
            } else {
                moveTo = focusItemIndex - 4;
            }
            enlargedItemArr.splice(moveTo, 0, shiftImg[0]);
        }
        //re-render based on modified img array
        this.setState({
            [imgRw]: enlargedItemArr
        })
        
    }


    render() {
        return (
            <div>
                <div className="img-container">
                    {
                        this.state.imageRow1.map(x => {
                            return <Cell
                                row={1}
                                key={x.id} 
                                imgId={x.id}
                                src={x.enlarged ? x.color : x.gray}
                                className={x.enlarged ? "cell enlarged1" : "cell"}
                                fx={this.sizeUp}
                            />
                        })
                    }
                </div>
                <div className="img-container">
                    {
                        this.state.imageRow2.map(x => {
                            return <Cell
                                row={2}
                                key={x.id} 
                                imgId={x.id}                            
                                src={x.enlarged ? x.color : x.gray}
                                className={x.enlarged ? "cell enlarged2" : "cell"}
                                fx={this.sizeUp}
                            />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;
