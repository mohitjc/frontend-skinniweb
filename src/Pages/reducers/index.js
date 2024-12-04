/*********** Reduceres defined here *********/

import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';

// reducers
import user from './modules/user';
import loader from './modules/loader';
import search from './modules/search';
import sitedetail from './modules/sitedetail';
import subscription from './modules/subscription';
import environment from '../../environment';

// Encryption transform
const encryptTransformF = encryptTransform({
    secretKey: environment.secretKey,  
    onError: function (error) {
        console.error('Encryption error:', error);
    },
});

const userPersistConfig = {
    key: 'skinniWeb-app',
    storage: storage,
    blacklist: ['loader'],
    transforms: [encryptTransformF],
};

export default persistCombineReducers(userPersistConfig, {
    loader,
    user,
    search,
    sitedetail,
    subscription
});
