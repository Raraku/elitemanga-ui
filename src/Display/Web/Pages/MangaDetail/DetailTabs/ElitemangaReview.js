import React, { useState } from "react";
import {
  Accordion,
  Icon,
  Container,
  Grid,
  div,
  Progress,
  StatisticGroup,
  Statistic,
} from "semantic-ui-react";
import { Col, Row } from "react-bootstrap";
import { Circle } from "react-circle";

export default class AccordionExampleStandard extends React.Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const elitemangareview = this.props.elitemangareview;
    const { activeIndex } = this.state;
    console.log(this.props);
    if (elitemangareview) {
      return (
        <div>
          <Accordion fluid styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Entertainment Value
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <p
                className="accordion-p"
                dangerouslySetInnerHTML={{
                  __html: elitemangareview.entertainment_value,
                }}
              ></p>
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Characters
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <p
                className="accordion-p"
                dangerouslySetInnerHTML={{
                  __html: elitemangareview.characters,
                }}
              ></p>
              <p>{elitemangareview.characters}</p>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Plot
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <p
                className="accordion-p"
                dangerouslySetInnerHTML={{ __html: elitemangareview.plot }}
              ></p>
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 3}
              index={3}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              {this.props.media_type == 0 ? "Art Quality" : "Animation Quality"}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <p
                className="accordion-p"
                dangerouslySetInnerHTML={{ __html: elitemangareview.quality }}
              ></p>
            </Accordion.Content>
          </Accordion>
          <Row>
            <Col xs={12} md={6}>
              <div className="mb-2 mt-5 d-flex review-div">
                <div>
                  <div className="font-review">Entertainment Value</div>
                  <div>
                    <Progress
                      value={elitemangareview.entertainment_value_score}
                      total="10"
                      indicating
                      progress="ratio"
                    />
                  </div>
                </div>

                <div>
                  <div className="font-review">Characters</div>
                  <div>
                    <Progress
                      value={elitemangareview.characters_score}
                      total="10"
                      indicating
                      progress="ratio"
                    />
                  </div>
                </div>

                <div>
                  <div className="font-review">Plot</div>
                  <div>
                    <Progress
                      value={elitemangareview.plot_score}
                      total="10"
                      indicating
                      progress="ratio"
                    />
                  </div>
                </div>

                <div>
                  <div className="font-review">
                    {this.props.media_type == 0
                      ? "Art Quality"
                      : "Animation Quality"}
                  </div>
                  <div>
                    <Progress
                      value={elitemangareview.quality_score}
                      total="10"
                      indicating
                      progress="ratio"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <StatisticGroup className="d-flex justify-content-center align-items-center">
                <Statistic className="aii">
                  <Statistic.Value className="myhuge">
                    <Circle
                      responsive={true}
                      progressColor="rgba(1, 37, 138, 0.445)"
                      textColor="rgba(1, 37, 138, 0.445)"
                      progress={(elitemangareview.total_score / 40) * 100}
                      textValue={`${elitemangareview.total_score}/40`}
                    />
                  </Statistic.Value>
                  <Statistic.Label>Total Score</Statistic.Label>
                </Statistic>
              </StatisticGroup>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div
          style={{ fontSize: "1.3em", fontWeight: "600" }}
          className="text-center rev-alt-text"
        >
          <Icon name="search" /> No review yet. Check back in a day or two.
        </div>
      );
    }
  }
}
