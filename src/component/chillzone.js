import React from "react";
import ReactDOM from "react-dom";
import Button from "./button.js";
import Compteur from "./compteur.js";

class ChillZone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            minutes: 5,
            currenttime: 5,
            secondes: 0,
            pause: false,
        }
    }
    stopAndGo() { // fonction qui fait "passer le temps" et qui l'arrete une fois a zero
        if (!this.state.running) {
            this.interval = setInterval(() => {
                if (this.state.secondes < 1) {
                    if (this.state.currenttime === 0) {

                        clearInterval(this.interval);
                        this.setState({
                            currenttime: this.state.minutes,

                            running: false,
                        })
                        this.props.working();

                    } else {
                        this.setState({
                            currenttime: (this.state.currenttime - 1),
                            secondes: 59,
                        })
                    }
                } else {
                    this.setState({
                        secondes: (this.state.secondes - 1),
                    })
                }
            }
                , 1000)
        } else {
            clearInterval(this.interval);
            this.setState({
                currenttime: this.state.minutes,
                secondes: 0,
            })
        }

    }

    breaktime(x) {
        if (!this.state.pause) {
            this.setState({
                currenttime: x,
                pause: true,
            })
            this.stopAndGo();
        }
    }

    render() {

        const status = this.state.running ? "Stop" : "Start";
        const strSecondes = (this.state.secondes < 10) ? ("0" + this.state.secondes) : "" + this.state.secondes;
        const strMinutes = (this.state.currenttime < 10) ? ("0" + this.state.currenttime) : "" + this.state.currenttime;

        let count = <h2 className="compteur">Time to Chill</h2>

        if (this.state.pause) {
            count = <Compteur key={1} class="compteur" minutes={strMinutes} secondes={strSecondes} />;
        }

        return (

            <div className="box chill">
                {count}
                <Button class="btnplus" onClick={() => this.props.working()} content={[<p>Go back to work</p>]} />
                <Button class="" onClick={() => this.breaktime(5)} content={[<p>Pause de 5 min</p>]} />
                <Button class="btnmoin" onClick={() => this.breaktime(25)} content={[<p>Pause de 25 min</p>]} />


            </div>


        )
    }
}
export default ChillZone;