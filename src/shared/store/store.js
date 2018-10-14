import storeCreator from 'src/shared/store/store-creator';
import testReducer from 'src/shared/reducers/test-reducer';

const reducers = {
  test: testReducer
};

const store = storeCreator(reducers);

export default store;
