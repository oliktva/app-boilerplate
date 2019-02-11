export const ACTION_TYPE = 'ACTION_TYPE';

export type TestState = {
  test: string
}

export type TestAction = {
  type: 'ACTION_TYPE',
  data: TestState
}

export function actionFunc(): TestAction {
  return {
    type: ACTION_TYPE,
    data: { test: 'test' }
  };
}

const initialState: TestState = {
  test: ''
};

export default function test(state: TestState =initialState, action: TestAction): TestState {
  switch (action.type) {
  case ACTION_TYPE:
    return {
      ...state,
      test: action.data.test
    };

  default:
    return state;
  }
}
