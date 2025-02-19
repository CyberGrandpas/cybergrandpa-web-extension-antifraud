import { compressReadableStream } from './compress-readable-stream';
import { getArrayFromString } from './get-array-from-string';

class GetStream {
  constructor(public url: string) {
    this.url = url;
  }

  private fetch() {
    const response = fetch(this.url).then((res) => {
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
    });

    return response;
  }

  public async toReadableStream() {
    return await this.fetch();
  }

  public async toBase64String() {
    const response = await this.toReadableStream();

    return await compressReadableStream(response);
  }

  public async toString() {
    const response = await this.toReadableStream();

    return new Response(response).text();
  }

  public async toArray(filter?: (x: string) => boolean, replace?: string) {
    return getArrayFromString(await this.toString(), filter, replace);
  }
}

export { GetStream };
