import React from "react";
import ReactDOM from "react-dom";
import Titre from "./component/titre.js";
import Box from "./component/box.js";
import ChillZone from "./component/chillzone.js"

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            working: true,
        }

        
    }

    switchwork() {
        this.setState({
            working: !this.state.working,
        })
    }


    render() {
        let pomo = <p>coucou</p>;

        if (this.state.working) {
            pomo = <Box key={0} working={() => this.switchwork()} />;
        } else {
            pomo = <ChillZone working={() => this.switchwork()} />;
        }
        return (
            <div>

                <Titre content={"Pomosobro"} />
                <div className="container">

                    {pomo}
                </div>

            </div>
        )
    }
}

let App = document.getElementById("app");

ReactDOM.render(<Pomodoro />, App);