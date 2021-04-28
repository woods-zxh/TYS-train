import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './DialogPanel.css';
import EventHub from "./EventHub";

export interface DialogState {
    isUser: boolean,
    numOfDialogs: number,
    currentNum: number,
    currentDialog: string,
}

export interface NameProps {
    name: string,
    isUser: boolean,
}

export interface DialogProps {
    contain: string,
    isUser: boolean,
    onClick(): any,
}

class DialogPanel extends React.Component<{}, DialogState> {
    // Assume get from backend interface
    private dialog: string[] = [
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test6"
    ];
    private username: string = "user";
    private aiName: string = "ai";

    constructor(props: {}) {
        super(props);
        this.state = {
            isUser: true,
            numOfDialogs: this.dialog.length,
            currentNum: 1,
            currentDialog: this.dialog[0],
        };
        EventHub.on("reset", this.reset);
    }

    reset = () => {
        this.setState({
            isUser: true,
            currentNum: 1,
            currentDialog: this.dialog[0],
        });
    }

    childrenClickCallback = () => {
        // this.setState({isUser: !this.state.isUser, currentNum: this.state.currentNum+1})
    }

    clickCallback = () => {
        if (this.state.currentNum === this.state.numOfDialogs) return ;
        this.setState({
            isUser: !this.state.isUser,
            currentNum: this.state.currentNum+1,
            currentDialog: this.dialog[this.state.currentNum],
        });
        EventHub.trigger("forward");
    }

    render() {
        return (
            <div className="dialogPanel" onClick={this.clickCallback}>
                <div className="nameLabel">
                    <NameLabel
                        name={this.state.isUser ? this.username : this.aiName}
                        isUser={this.state.isUser}>
                    </NameLabel>
                </div>
                <div className="dialogBox">
                    <DialogBox
                        contain={this.state.currentDialog}
                        isUser={this.state.isUser}
                        onClick={this.childrenClickCallback}>
                    </DialogBox>
                </div>
            </div>
        );
    }
}

class NameLabel extends React.Component<NameProps, {}> {
    render() {
        if(this.props.isUser)
            return (
                <div className="nameContainer">
                    <div className="userNameLabel">
                        <button className="btn btn-primary nameButton" disabled>
                            {this.props.name}
                        </button>
                    </div>
                </div>
            );
        else
            return (
                <div className="nameContainer">
                    <div className="aiNameLabel">
                        <button className="btn btn-secondary nameButton" disabled>
                            {this.props.name}
                        </button>
                    </div>
                </div>
            );
    }
}

class DialogBox extends React.Component<DialogProps, {}> {
    render() {
        console.log(this.props);
        if(this.props.isUser)
            return (
                <div className="userDialogArea">
                    <div className="userDialogTextArea dialogTextBox">
                        {this.props.contain}
                    </div>
                </div>
            );
        else
            return (
                <div className="aiDialogArea">
                    <div className="aiDialogTextArea dialogTextBox">
                        {this.props.contain}
                    </div>
                </div>
            );
    }
}

export default DialogPanel;
