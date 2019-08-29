import { actionTypes } from '../actions';
import success from './success';

test('return default initial state of "false" when no action is passed', () => {
  const newState = success(undefined, {});
  expect(newState).toBe(false);
});
test('return state of true upon receining an action of type "CORRECT_GUESS"', () => {
  const newState = success(undefined, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});