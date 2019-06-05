import React, { Component } from 'react';
import CardComponent from './CardComponent';
import { FIELDS_FORM as FIELDS } from './constants';

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewValue: '',
            nameValue: '',
            emailValue: '',
            fieldsFilled: [],
            cardItemChecker: {
                allFieldsFilled: false,
                isReviewLength100: false,
                isAcmeMentioned: false,
                isPinchMentioned: false,
                hasFreeSample: false
            },
        };
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleReviewChange = (event) => {
        let value = event.target.value;
        let cardItemChecker = { ...this.state.cardItemChecker };

        cardItemChecker["hasFreeSample"] = value.toLowerCase().includes("free sample") || value.toLowerCase().includes("free trial");
        cardItemChecker["isAcmeMentioned"] = value.toLowerCase().includes("acme beard trimmer");
        cardItemChecker["isPinchMentioned"] = value.includes("PINCHme");
        cardItemChecker["isReviewLength100"] = (value && value.length >= 100) ? true : false;

        let fieldsFilled = [...this.state.fieldsFilled];
        let index = fieldsFilled.indexOf(FIELDS.REVIEW);

        if (value.length > 0) {
            if (index === -1)
                fieldsFilled.push(FIELDS.REVIEW);
        } else {
            if (index !== -1)
                fieldsFilled.splice(index, 1);
        }

        cardItemChecker["allFieldsFilled"] = fieldsFilled.length === 3 ? true : false;

        this.setState({
            ...this.state,
            cardItemChecker,
            fieldsFilled,
            reviewValue: value
        });
    }

    handleNameChange = (event) => {
        let value = event.target.value;
        let cardItemChecker = { ...this.state.cardItemChecker };
        let fieldsFilled = [...this.state.fieldsFilled];
        let index = fieldsFilled.indexOf(FIELDS.NAME);

        if (value) {
            if (index === -1)
                fieldsFilled.push(FIELDS.NAME);
        } else {
            if (index !== -1)
                fieldsFilled.splice(index, 1);
        }

        cardItemChecker["allFieldsFilled"] = (fieldsFilled.length === 3) ? true : false;

        this.setState({
            ...this.state,
            fieldsFilled,
            cardItemChecker,
            nameValue: value,
        })
    }

    handleEmailChange = (event) => {
        let value = event.target.value;
        let cardItemChecker = { ...this.state.cardItemChecker };
        let fieldsFilled = [...this.state.fieldsFilled];
        let index = fieldsFilled.indexOf(FIELDS.EMAIL);

        if (value) {
            if (index === -1)
                fieldsFilled.push(FIELDS.EMAIL);
        } else {
            if (index !== -1)
                fieldsFilled.splice(index, 1);
        }

        cardItemChecker["allFieldsFilled"] = (fieldsFilled.length === 3) ? true : false;
        this.setState({ ...this.state, emailValue: value, cardItemChecker, fieldsFilled });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="form-box">
                    <form onSubmit={this.handleSubmit} className="form">
                        <div className="form-box-textarea">
                            <p>Provide your review of the <strong>Acme Beard Trimmer</strong></p>
                            <textarea name="review" id="review" rows="10" value={this.state.reviewValue} onChange={this.handleReviewChange}></textarea>
                        </div>
                        <div className="form-box-input">
                            <div className="name-input">
                                <label htmlFor="name">Name:</label>
                                <input name="name" id="name" type="text" value={this.state.nameValue} onChange={this.handleNameChange} placeholder="Password" />
                            </div>
                            <div className="email-input">
                                <label htmlFor="email">E-mail Address:</label>
                                <input name='email' id="email" type="text" value={this.state.emailValue} onChange={this.handleEmailChange} placeholder="Password" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="card-box">
                    <CardComponent statusData={this.state.cardItemChecker} />
                </div>
            </div>
        );
    }
}
export default MainComponent;