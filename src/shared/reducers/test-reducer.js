
export const ACTION_TYPE = 'ACTION_TYPE';

export function actionFunc() {
  return {
    type: ACTION_TYPE,
    data: { test: 'test' }
  };
}

let initialState = {
  test: ''
};

export default function test(state=initialState, action) {
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
