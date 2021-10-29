import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import {
  Segment,
  Loader,
  Item,
  Header,
  Icon,
  Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListDetail = (props) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState(null);
  const [loading_other, setLoadingOther] = useState(true);
  useEffect(() => {
    axios
      .get(`/lists/${props.match.params.listSlug}/get_related_lists/`)
      .then((res) => {
        setLists(res.data);
        setLoadingOther(false);
      });
  }, [props.location.key]);
  useEffect(() => {
    axios.get(`/lists/${props.match.params.listSlug}`).then((res) => {
      setList(res.data);
      setLoading(false);
    });
  }, [props.location.key]);
  console.log(list);

  return (
    <div>
      {!loading ? (
        <Container fluid className="p-4">
          <Row>
            <Col xs={12} md={9}>
              <div className="article">
                <h1 className="list-title">{list.title}</h1>
                <p>
                  {" "}
                  <span className="list-time">
                    Uploaded on: {new Date(list.date_uploaded).toDateString()}
                  </span>
                </p>
                <img src={list.image} className="list-intro-image" />
                <p>
                  <span className="list-forgotten">{list.upvotes} upvotes</span>
                </p>
                <p className="list-excerpt">{list.intro}</p>
                <div>
                  {list.listsection_set.reverse().map((item) => (
                    <div className="article-item">
                      <h5>
                        <span className="item-num">
                          {item.position}/
                          <span className="lil-brother">
                            {list.listsection_set.length}
                          </span>
                        </span>
                        <span className="list-item-title">{item.media}</span>
                      </h5>
                      <img src={list.image} className="list-intro-image" />
                      <p className="list-body">{item.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <Segment className="list-segment">
                <Card>
                  <Card.Header>
                    <Divider horizontal>
                      <Header className="need-theme" as="h5">
                        <Icon name="rss" />
                        You might be interested in...
                      </Header>
                    </Divider>
                  </Card.Header>
                  <Card.Body>
                    {!loading_other ? (
                      <div>
                        <Item.Group unstackable divided>
                          {lists.map((list) => (
                            <Item as={Link} to={`/lists/${list.slug}`}>
                              <Item.Image size="tiny" src={list.image} />
                              <Item.Content>
                                <Item.Header className="list-header" as="a">
                                  {list.title}
                                </Item.Header>
                              </Item.Content>
                            </Item>
                          ))}
                        </Item.Group>
                      </div>
                    ) : (
                      <div style={{ height: "200px" }}>
                        <Loader active size="big"></Loader>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Segment>
            </Col>
          </Row>
        </Container>
      ) : (
        <Segment>
          <div style={{ height: "200px" }}>
            <Loader active size="big"></Loader>
          </div>
        </Segment>
      )}
    </div>
  );
};
export default ListDetail;
