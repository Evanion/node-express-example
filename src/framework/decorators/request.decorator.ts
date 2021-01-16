import { METHOD_METADATA, PATH_METADATA } from "../constants";
import { RequestMethod } from "../enums/RequestMethod.enum";

export interface RequestMappingMetaData {
  [PATH_METADATA]?: string | string[];
  [METHOD_METADATA]?: RequestMethod;
}

const defaultRequestMetaData: RequestMappingMetaData = {
  [PATH_METADATA]: "/",
  [METHOD_METADATA]: RequestMethod.GET,
};

export const requestMapping = (
  metadata = defaultRequestMetaData
): MethodDecorator => {
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : "/";
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    return descriptor;
  };
};

const createRequestDecorator = (method: RequestMethod) => (
  path?: string | string[]
): MethodDecorator =>
  requestMapping({ [PATH_METADATA]: path, [METHOD_METADATA]: method });

export const All = createRequestDecorator(RequestMethod.ALL);
export const Delete = createRequestDecorator(RequestMethod.DELETE);
export const Get = createRequestDecorator(RequestMethod.GET);
export const Head = createRequestDecorator(RequestMethod.HEAD);
export const Options = createRequestDecorator(RequestMethod.OPTIONS);
export const Patch = createRequestDecorator(RequestMethod.PATCH);
export const Post = createRequestDecorator(RequestMethod.POST);
export const Put = createRequestDecorator(RequestMethod.PUT);
