import Context from "./context";

const WithContext = (WrappedComponent) => {
  const withHOC = (props) => {
    <Context.Consumer>
      {(context) => {
        <WrappedComponent {...props} context={context} />;
      }}
    </Context.Consumer>;
  };
  return withHOC;
};
export default WithContext;
