import storeCreator from 'src/shared/store/store-creator';
import reducers from 'src/shared/reducers/reducers';

const store = storeCreator(reducers);

export default store;
