import React, { Component, memo } from "react";

class GoogleAds extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  isMobile =
    Math.min(window.screen.width, window.screen.height) < 768 ||
    navigator.userAgent.indexOf("Mobi") > -1;

  render() {
    if (this.isMobile) {
      return <></>;
    }
    return (
      <ins
        class="adsbygoogle vanish"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5543476548341387"
        data-ad-slot={this.props.slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}

export default React.memo(GoogleAds);
