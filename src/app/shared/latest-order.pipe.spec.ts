import { LatestOrderPipe } from './pipes/latest-order.pipe';

describe('LatestOrderPipe', () => {
  it('create an instance', () => {
    const pipe = new LatestOrderPipe();
    expect(pipe).toBeTruthy();
  });
});
