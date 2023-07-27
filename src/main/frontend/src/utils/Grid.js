import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    width,
    height,
    margin,
    border,
    radius,
    flexRow,
    flexColumn,
    justify,
    alignItems,
    isFlex,
    padding,
    textAlign,
    lineHeight,
    _onClick,
    bg,
    maxWidth,
    minHeight,
    maxHeight,
    fontWeight,
    fontSize,
    id,
    shadow,
    position,
    overflowY,
    hover,
    minWidth,
    zindex,
    flex,
    bgImg,
    bgSize,
    borderBottom,
    borderTop,
    _onScroll,
    color,
    wrap,
    display,
  } = props;
  const styles = {
    bg,
    width,
    height,
    margin,
    border,
    radius,
    flexRow,
    flexColumn,
    isFlex,
    padding,
    textAlign,
    lineHeight,
    maxWidth,
    minHeight,
    maxHeight,
    fontWeight,
    fontSize,
    shadow,
    position,
    overflowY,
    hover,
    minWidth,
    zindex,
    justify,
    alignItems,
    flex,
    bgImg,
    bgSize,
    borderBottom,
    borderTop,
    color,
    flex,
    wrap,
    display,
  };

  return (
    <Box {...styles} onClick={_onClick} onScroll={_onScroll} id={id}>
      {props.children}
    </Box>
  );
};

Grid.defaultProps = {
  width: "100%",
  height: "100%",
  color: "black",
};

const Box = styled.div`
  ${(props) => (props.display ? `display: ${props.display};` : null)}
  box-sizing: border-box;
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  color: ${(props) => `${props.color}`};
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : null)}
  ${(props) => (props.minWidth ? `min-width: ${props.minWidth};` : null)}
  ${(props) => (props.maxHeight ? `max-height: ${props.maxHeight};` : null)}
  ${(props) => (props.minHeight ? `min-height: ${props.minHeight};` : null)}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)}
  ${(props) => (props.padding ? `padding: ${props.padding};` : null)}
  ${(props) => (props.border ? `border: ${props.border};` : null)}
  ${(props) =>
    props.borderBottom ? `border-bottom: ${props.borderBottom};` : null}
  ${(props) => (props.borderTop ? `border-top: ${props.borderTop};` : null)}
  ${(props) =>
    props.flexColumn ? `display:flex; flex-direction: column;` : null}
  ${(props) => (props.flexRow ? `display:flex; flex-direction: row;` : null)}
  ${(props) =>
    props.justify
      ? `justify-content: ${props.justify};`
      : `justify-content: center;`}
  ${(props) =>
    props.alignItems
      ? `align-items: ${props.alignItems};`
      : `align-items: center;`}
  ${(props) => (props.textAlign ? `text-align: center;` : null)}
  ${(props) => (props.lineHeight ? `line-height: ${props.lineHeight};` : null)}
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : null)}
  ${(props) => (props.fontWeight ? `font-weight: ${props.fontWeight};` : null)}
  ${(props) => (props.shadow ? `box-shadow: ${props.shadow};` : null)}
  ${(props) => (props.position ? `position: ${props.position};` : null)}
  ${(props) => (props.zindex ? `z-index: ${props.zindex};` : null)}
  ${(props) => (props.overflowY ? `overflow-y: ${props.overflowY};` : null)}
  ${(props) => (props.wrap ? `flex-wrap: ${props.wrap};` : null)}
  &::-webkit-scrollbar {
    display: none;
  }
  ${(props) =>
    props.flex ? `display:${props.flex}; justify-content:start;` : null}
  ${(props) =>
    props.hover
      ? `&:hover {
    cursor: pointer;
  };`
      : null}
  ${(props) => (props.bgImg ? `background-image: url(${props.bgImg});` : null)}
  ${(props) => (props.bgSize ? `background-size: ${props.bgSize};` : null)}
  background-repeat: no-repeat;
  background-position: center;
  ${(props) =>
    props.isFlex
      ? `display:flex; align-items:center; justify-content: space-between`
      : null}
`;

export default Grid;