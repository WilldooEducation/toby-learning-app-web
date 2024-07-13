import React from "react";
const ResultContext = React.createContext({
  result: {},
  updateResult: (data: any) => {},
});

export default ResultContext;
