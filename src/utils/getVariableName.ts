export const getVariableName = (variable: Record<string, unknown>) => {
  return Object.keys(variable)[0];
};
