interface Props {
  flexDir?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?: "end" | "center" | "start" | "left" | "right";
  alignItems?: "end" | "center" | "start" | "left" | "right";
  alignContent:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  children?: React.ReactNode;
}

export default function Flex(props: Props) {
  return (
    <div
      className="flex"
      style={{
        flexDirection: props?.flexDir ? props.flexDir : "row",
        justifyContent: props?.justifyContent ? props.justifyContent : "normal",
        alignItems: props?.alignItems ? props.alignItems : "normal",
        alignContent: props?.alignContent ? props.alignContent : "normal",
      }}
    >
      {props?.children}
    </div>
  );
}
