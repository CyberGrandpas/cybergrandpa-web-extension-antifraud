export const getArrayFromString = (body: string, filter?: (x: string) => boolean, replace?: string) => {
  let output = body.split('\n');

  if (filter) output = output.filter(filter);
  if (replace) output = output.map((x) => x.replace(replace, '').trim());

  return output;
};
