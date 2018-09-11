import React from 'react'
import styles from './header.module.css'
import Link from 'gatsby-link'

const LinkElement = props => (
  <li className={styles.linkItem}>
    <Link to={props.to}>{props.children.toUpperCase()}</Link>
  </li>
)

export default () => (
  <div className={styles.header}>
    <LinkElement to='/'>Introduction</LinkElement>
    <LinkElement to='/'>Experience</LinkElement>
    <LinkElement to='/'>Education</LinkElement>
    <LinkElement to='/'>Conclusion</LinkElement>
  </div>
)
