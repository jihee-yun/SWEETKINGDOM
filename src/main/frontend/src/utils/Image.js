import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const {
    src,
    bg,
    border,
    borderRadius,
    width,
    height,
    margin,
    type,
    onChange,
    objectFit,
    shadow,
    hover,
    _onClick,
  } = props;
  const styles = {
    src,
    bg,
    width,
    height,
    margin,
    border,
    borderRadius,
    objectFit,
    shadow,
    hover,
  };

  if (type === "circle") {
    return <CircleImg src={src} {...styles}></CircleImg>;
  }
  if (type === "rectangle") {
    return (
      <React.Fragment>
        <AspectOutter>
          <AspectInner {...styles}></AspectInner>
        </AspectOutter>
      </React.Fragment>
    );
  }
  return (
    <Img onChange={onChange} onClick={_onClick} src={src} {...styles}></Img>
  );
};

Image.defaultProps = {
  border: "none",
  margin: false,
  borderRadius: false,
  objectFit: "cover",
};

const Img = styled.img`
  ${(props) => (props.bg ? `background-color: ${props.bg};` : null)}
  ${(props) => (props.width ? `width: ${props.width};` : null)}
  ${(props) => (props.height ? `height: ${props.height};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.border ? `border: ${props.border};` : null)}
  ${(props) =>
    props.borderRadius ? `border-radius: ${props.borderRadius};` : null}
  ${(props) =>
    props.shadow ? `shadow : 0 4px 12px rgba(0, 0, 0, 0.1);` : null}
  object-fit:${(props) => `${props.objectFit}`};
  box-sizing: border-box;
  ${(props) => (props.zindex ? `z-index: ${props.zindex};` : null)}
  ${(props) => (props.hover ? `&:hover {cursor: pointer;};` : null)}
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 150px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

const CircleImg = styled.img`
  ${(props) => (props.height ? `height: ${props.height};` : null)}
  ${(props) => (props.width ? `width: ${props.width};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  border-radius: 100%;
  object-fit: cover;
  ${(props) => (props.hover ? `&:hover { cursor: pointer; };` : null)}
`;

export default Image;