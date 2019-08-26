import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { getSecreWord } from './index';

describe('get secretWord action creatore', () => {
  beforeEach(() => {
    moxios.install();



  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('adds response word to state', () => {
    const secretWord = 'party';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.request.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });
  });




});