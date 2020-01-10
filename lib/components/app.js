'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');
var StyleRoot = Radium.StyleRoot;

var _require = require('radium-bootstrap-grid'),
    Container = _require.Container,
    Column = _require.Column,
    Row = _require.Row;

var Header = require('./header');
var Nav = require('./navigation');
var Content = require('./content');

var _require2 = require('./styles'),
    lineHeight = _require2.lineHeight;

var Utils = require('../utils');

var hasMembers = function hasMembers(doc) {
  var m = doc.members;
  return m.static.length > 0 || m.instance.length > 0 || m.events && m.events.length > 0;
};

var App = function App(_ref) {
  var options = _ref.options,
      docs = _ref.docs;

  var containerStyle = {
    paddingTop: lineHeight(4)
  };

  var navItems = docs.map(function (doc) {
    return {
      name: doc.name,
      members: hasMembers(doc) ? doc.members : null
    };
  });

  var navStyle = {
    position: 'fixed',
    height: '80%',
    maxWidth: '300px'
  };

  var utils = new Utils(options, docs);
  var radiumConfig = {
    userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
  };
  return React.createElement(
    StyleRoot,
    { radiumConfig: radiumConfig },
    React.createElement(Header, {
      name: options.name,
      version: options.version,
      project: options.project }),
    React.createElement(
      Container,
      { style: containerStyle },
      React.createElement(
        Row,
        null,
        React.createElement(
          Column,
          {
            lg: 3, md: 3, sm: 3,
            xsHidden: true, msHidden: true,
            style: navStyle },
          React.createElement(Nav, {
            items: navItems,
            utils: utils })
        ),
        React.createElement(
          Column,
          {
            lg: 8, lgPush: 4,
            md: 8, mdPush: 4,
            sm: 8, smPush: 4,
            ms: 12, msPush: 0,
            xsPush: 0, xs: 12 },
          React.createElement(Content, {
            docs: docs,
            utils: utils })
        )
      )
    )
  );
};

App.propTypes = {
  options: PropTypes.object.isRequired,
  docs: PropTypes.array.isRequired
};

module.exports = Radium(App);