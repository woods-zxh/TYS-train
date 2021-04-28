import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navigation.css';
import EventHub from "./EventHub";

export interface NaviProps {
    name: string;
    num: number;
    isSelected: boolean;
}

export interface naviState {
    currentStep: number,
}

class NavigationBar extends React.Component<{}, naviState> {
    // Assume get from backend interface
    private steps: string[] = ["step1", "step2", "step3", "step4", "step5", "step6"];

    constructor(props: {}) {
        super(props);
        this.state = {
            currentStep: 1,
        };
        EventHub.on("forward", this.stepMoveForward)
    }

    stepMoveForward = () => {
        this.setState({currentStep: this.state.currentStep+1});
    }

    // renderStep(i: number) {
    //     return <StepLabel isSelected={this.state.currentStep === i} name={this.steps[i-1]} num={i}/>;
    // }

    reset() {
        this.setState({currentStep: 1})
        EventHub.trigger("reset");
    }

    render() {
        let stepList = this.steps.map((item, index) => {
            return (
                <div className="stepContainer col-sm">
                    <StepLabel isSelected={this.state.currentStep === index+1} name={item} num={index+1}/>
                </div>
            );
        })
        return (
            <div className="navigationBar container-fluid">
                <div className="row">
                    <div className="col-2">
                        <div className="naviButton">
                            <button className="btn btn-primary" onClick={() => this.reset()}>
                                <i className="bi bi-arrow-left-circle-fill"> </i>
                            </button>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="navigationRow row">
                            {stepList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class StepLabel extends React.Component<NaviProps, {}> {
    render() {
        if(this.props.isSelected)
            // Todo: change style when selected
            return (
                <div className="stepSelected row">
                    <div className="stepNumSelected col-2">{this.props.num}</div>
                    <div className="stepNameSelected col-10">{this.props.name}</div>
                </div>
            );
        else
            return (
                <div className="step row">
                    <div className="stepNum col-2">{this.props.num}</div>
                    <div className="stepName col-10">{this.props.name}</div>
                </div>
            );
    }
}

export default NavigationBar;
