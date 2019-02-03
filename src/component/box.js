import React from "react";
import ReactDOM from "react-dom";
import Button from "./button.js";
import Compteur from "./compteur.js";

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            minutes: 20,
            currenttime: 20,
            secondes: 0,
            pause: false,
        }
    }


    addminutes(x) { //fonction qui gère l'addition ou soustraction de minutes
        if (this.state.minutes < 1 && x === (-1)) {
            return
        }
        if (!this.state.running) {
            this.setState({
                minutes: (this.state.minutes + x),
                currenttime: (this.state.currenttime + x),
            })

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
                            secondes: 5,
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
        this.setState({
            running: !this.state.running,
        })
    }
    render() {

        const status = this.state.running ? "Stop" : "Start";
        const strSecondes = (this.state.secondes < 10) ? ("0" + this.state.secondes) : "" + this.state.secondes;
        const strMinutes = (this.state.currenttime < 10) ? ("0" + this.state.currenttime) : "" + this.state.currenttime;

        return (
            <div className="box">
                <Compteur key={1} class="compteur" minutes={strMinutes} secondes={strSecondes} />

                
                <Button key={2} class="btnplus" content={[<i className="fas fa-plus" ></i>]} onClick={() => this.addminutes(1)} />



                <Button key={3} class="toggle" content={status} onClick={() => this.stopAndGo()} />


                <Button key={4} class="btnmoin" content={[<i className="fas fa-minus"></i>]} onClick={() => this.addminutes(-1)} />
                
            </div>
        )
    }
}
export default Box;