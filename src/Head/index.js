import React from 'react';
import {Helmet} from "react-helmet";

export function Head(props) {
  return (
    <Helmet>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <title>{props.title}</title>
      <link rel="stylesheet" href="main.css"/>
      <link href="https://fonts.googleapis.com/css?family=Amatic+SC|Dancing+Script" rel="stylesheet"/>
    </Helmet>
  );
};
