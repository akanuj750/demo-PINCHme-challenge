import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import checkImg from './images/check-sign.png'
import closeImg from './images/close1.png'
import { FIELDS_CARD as FIELDS, CARD_LIST as LIST } from './constants';

class CardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            rating: 0
        };
    }

    isChecked = (item) => {
        if (this.props.statusData) {
            let data = this.props.statusData;
            switch (item) {
                case FIELDS["100_CHARS"]:
                    return data.isReviewLength100;
                case FIELDS.ACME_BEARD:
                    return data.isAcmeMentioned;
                case FIELDS.ALL_FIELDS:
                    return data.allFieldsFilled;
                case FIELDS.FREE_SAMPLE:
                    return data.hasFreeSample;
                case FIELDS.PINCH_ME:
                    return data.isPinchMentioned;
            }
        }
        return false;
    }

    listItemComponent = (item) => {
        return (
            <React.Fragment key={item}>
                <Row noGutters="true" >
                    <Col sm={1}> <img src={this.isChecked(item) === true ? checkImg : closeImg} style={{ width: "15px" }} /> </Col>
                    <Col sm={{ span: 10, offset: 1 }}><div dangerouslySetInnerHTML={{ __html: `${LIST[item]}` }}></div></Col>
                </Row>
            </React.Fragment>
        )
    }

    render() {
        const fieldKeys = Object.keys(FIELDS);
        let countTrueValue = 0;

        const statusData = { ...this.props.statusData };
        for (const key in statusData) {
            if (statusData[key])
                countTrueValue++;
        }

        return (
            <Card className="card">
                <Card.Header id="card-header">
                </Card.Header>
                <Card.Body className="card-body">
                    <h5>Feedback Progress</h5>
                    {fieldKeys.map(item => this.listItemComponent(item))}
                </Card.Body>

                <Card.Footer id="card-footer">
                    <StarRatings
                        rating={countTrueValue}
                        starRatedColor="#1E7BE2"
                        numberOfStars={5}
                        name='rating'
                    />
                    <p>
                        All Star Review
                    </p>
                </Card.Footer>
            </Card>
        );
    }
}

export default CardComponent;