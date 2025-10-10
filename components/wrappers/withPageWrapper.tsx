import React from "react";
import PageWrapper from "./PageWrapper";

export function withPageWrapper<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  const Wrapped: React.FC<P> = (props) => (
    <PageWrapper>
      <Component {...(props as P)} />
    </PageWrapper>
  );
  Wrapped.displayName = `withPageWrapper(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
}
