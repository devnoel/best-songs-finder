"use strict"

import React, { Children } from "react"

function MainHeading(props) {
  return (
    <h1 className="cl-main-heading">
      {props.children}
    </h1>
  )
}

export default MainHeading
