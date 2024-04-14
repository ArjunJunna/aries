import React, { useEffect, useState } from "react";
import { ReactNode } from "react";

type ChildrenProp={
    children:ReactNode
}

const HydrationZustand = ({ children }:ChildrenProp) => {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default HydrationZustand;


