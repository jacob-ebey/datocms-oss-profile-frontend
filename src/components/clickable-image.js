import React from "react"
import cx from "classnames"
import Img from "gatsby-image"

export default props => {
  const [open, setOpen] = React.useState(false)

  const handleClick = React.useCallback(() => setOpen(!open), [open, setOpen])

  return (
    <div
      className="clickable-image"
      onClick={handleClick}
    >
      <Img {...props} />

      <div
      className={cx("clickable-image__wrapper", open && "clickable-image__wrapper--open")}
      onClick={handleClick}
    >
      <div className="clickable-image__inner">
        <Img {...props} />
      </div>
      </div>
    </div>
  )
}
