import React from "react";

export const Command = ({ children, ...props }: { children: React.ReactNode }) => {
  return <div {...props} className="command">{children}</div>;
};

export const CommandEmpty = (props: any) => {
  return <div {...props} className="command-empty">Nie znaleziono.</div>;
};

export const CommandGroup = (props: any) => {
  return <div {...props} className="command-group">{props.children}</div>;
};

export const CommandInput = (props: any) => {
  return <input {...props} className="command-input" />;
};

export const CommandItem = ({ onSelect, children, ...props }: any) => {
  return (
    <div {...props} onClick={onSelect} className="command-item">
      {children}
    </div>
  );
};