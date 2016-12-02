'use strict'

const React = require('react')
const Radium = require('radium')

const Utils = require('../../utils')
const {lineHeight} = require('../styles')
const SectionGroup = require('./section-group')
const SourceLink = require('./source-link')
const Extends = require('./extends')

const Section = ({
  name,
  namespace,
  description,
  section,
  utils
}) => {
  const members = section.members
  const memberTypes = [
    'static',
    'instance',
    'events'
  ].filter((key) => {
    return members[key] && members[key].length > 0
  })

  const style = {
    marginBottom: lineHeight(4)
  }

  return (
    <div style={style}>
      <h1>
        <a className='anchor' name={namespace} />
        {name}
        <SourceLink context={section.context} />
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: utils.md(description)
        }} />
      <Extends list={section.augments} utils={utils} />
      {memberTypes.map((type, i) => (
        <SectionGroup
          key={i}
          name={type}
          utils={utils}
          parent={name}
          members={members[type]} />
       ))}
    </div>
  )
}

Section.propTypes = {
  name: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.string,
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]).isRequired,
  section: React.PropTypes.object,
  utils: React.PropTypes.instanceOf(Utils).isRequired
}

module.exports = Radium(Section)
