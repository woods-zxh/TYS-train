import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navigation.css';

export interface NaviProps {
    name: string;
    num: number;
    isSelected: boolean;
}

class NavigationBar extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            steps: ["step1", "step2", "step3", "step4", "step5"],
            currentStep: 0,
        };
    }

    renderStep(i: number) {
        // @ts-ignore
        return <StepLabel isSelected={this.state.currentStep === i} name={this.state.steps[i-1]} num={i}/>;
    }

    reset() {
        // Todo: reset the page
        console.log("reset");
    }

    render() {
        // Todo: auto render all the steps
        return (
            <div>
                <div className="naviButton">
                    <button className="btn btn-primary" onClick={() => this.reset()}>
                        <i className="bi bi-arrow-left-circle-fill"> </i> Restart
                    </button>
                </div>
                <div className="navigationRow">
                    {this.renderStep(1)}
                    {this.renderStep(2)}
                    {this.renderStep(3)}
                    {this.renderStep(4)}
                    {this.renderStep(5)}
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
                <div className="stepSelected">
                    <div className="stepNumSelected">{this.props.num}</div>
                    <div className="stepNameSelected">{this.props.name}</div>
                </div>
            );
        else
            return (
                <div className="step">
                    <div className="stepNum">{this.props.num}</div>
                    <div className="stepName">{this.props.name}</div>
                </div>
            );
    }
}

export default NavigationBar;