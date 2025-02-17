const getArrayFromStream = (body: string) => {
  return body
    .split('\n')
    .filter((x) => x.startsWith('0.0.0.0'))
    .map((x) => x.replace('0.0.0.0 ', ''));
};

export const getStreamArray = async (url: string) => {
  const response = await fetch(url)
    .then((res) => {
      if (!res || !res.body) {
        throw new Error('Network response was not ok');
      }

      const reader = res.body?.getReader();

      return new ReadableStream({
        start(controller) {
          function push() {
            reader?.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });
    })
    .then((stream) => new Response(stream))
    .then((response) => response.text());

  return getArrayFromStream(response);
};
