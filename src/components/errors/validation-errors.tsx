import React from "react";

export type ValidationMessageItemType = {
  [key: string]: string[];
};

const isValidationMessage = (
  obj: any
): obj is { path: string; msg: string } => {
  return obj && obj.path && obj.msg;
};

export const makeValidationResponse = (validationError: object[]) => {
  let result: ValidationMessageItemType | null = null;
  validationError.forEach((validation) => {
    if (isValidationMessage(validation)) {
      if (!result) {
        result = { [validation.path]: [validation.msg] };
        return;
      }
      if (!result[validation.path]) {
        result[validation.path] = [validation.msg];
        return;
      }
      result[validation.path].push(validation.msg);
      return;
    }
  });
  return result;
};

const ValidationMessages: React.FC<{
  validationMessages: ValidationMessageItemType;
}> = ({ validationMessages }) => {
  return (
    <div className="border-red-500 border-2 px-2 py-1 rounded-lg bg-red-300">
      {Object.keys(validationMessages).map((fieldName) => {
        return (
          <div key={fieldName}>
            Field `{fieldName}`:
            <ul className="ml-5">
              {validationMessages[fieldName].map((message, index) => {
                return <li key={index}>{message}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ValidationMessages;
