import { ImageProps } from "antd";
import { FC } from "react";
import { Media } from "reactstrap";

export const Image: FC<ImageProps> = (props) => {
    return <Media {...props} alt={props.alt ? props.alt : "image"} loading="lazy" />;
};  

