import { HandlerInsertFile } from './types';

export const ON_INSERT_FILE = new WeakMap<object, HandlerInsertFile>();
export const ON_UPLOAD_START = new WeakMap();
export const ON_UPLOAD_PROGRESS = new WeakMap();
export const ON_UPLOAD_COMPLETE = new WeakMap();
