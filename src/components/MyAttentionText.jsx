const MyAttentionText = (props) => {
  return (
    <p
      className={`w-full text-center text-sm ${
        props.action === "error" ? "text-red-400" : "text-blue-400"
      }`}
    >
      {props.text}
    </p>
  );
};

export default MyAttentionText;
