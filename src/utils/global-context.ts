import React from "react";
import blockData from "@/block-data.json";
const GlobalContext = React.createContext({
  data: blockData,
  update: (data: any) => {},
});

export default GlobalContext;
