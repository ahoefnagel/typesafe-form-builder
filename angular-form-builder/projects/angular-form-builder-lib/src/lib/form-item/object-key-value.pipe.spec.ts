import { ObjectKeyValuePipe } from './object-key-value.pipe';

describe('ObjectKeyValuePipe', () => {
  it('create an instance', () => {
    const pipe = new ObjectKeyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
