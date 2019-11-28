import React, { Component } from 'react';
import axios from 'axios';
import './AddSummary.css';

export default class AddSummary extends Component {
    constructor(props) {
         super(props);

         const statesArray = [
            {
                tag: "nicotine",
                min: 0,
                max: 20,
                step: 1,
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, quasi."
            }
        ]

         this.state = {
             userId: "",
             username: "",
             sleep_start: 0,
             sleep_stop: 0,
             nicotine: 0,
             excersice: 0,
             meditation: 0,
             mood: 0,
             currentState: statesArray[0],
         }

         this.onChangeHandler = this.onChangeHandler.bind(this);
     }

     componentDidMount() {
        let user;
        axios.get('http://localhost:5000/usersession')
          .then(res => {
            user = res.data.slice(-1)[0];
            this.setState({
              userId: user.userId,
              username: user.username
            });
          })
          .catch(err => {
            console.log('Error : ' + err);
          })
      }

      onChangeHandler = (e, object) => {
          this.setState({
              [object]: e.target.value
          });
      }

      render() {
        let current = this.state.currentState;

          return (
              <div>
                  <div className="summary-grid">
                    <div className="tag">{current.tag.toUpperCase()}</div>
                    <div className="summary-icon">
                        <img src="/like.png" alt="icon"/>
                    </div>
                    <div className="description">{current.text}</div>
                    <div className="value">{this.state.nicotine}</div>
                    <div className="slider-container">
                        <input 
                            type="range"
                            min={current.min}
                            max={current.max}
                            defaultValue="0"
                            step={current.step} 
                            onChange={(e) => this.onChangeHandler(e, current.tag)} 
                            className="slider"
                        />
                    </div>
                    <button className="back">BACK</button>
                    <button className="next">NEXT</button>
                  </div>
              </div>
          )
      }
}