import { takeLatest, all, takeEvery, call, put } from 'redux-saga/effects';

import {
  SET_SIGNER,
  LOADED_NETWORKS,
  LOAD_NETWORKS,
  READER_ENABLED,
  WRITER_ENABLED,
  WRITER_DISABLED,
  LOAD_ACCOUNT,
  SET_NETWORK,
  SET_IDENTITY,
  PUSH_TRANSACTION,
  TRIGGER_UPDATE_MONITOR,
  UPDATE_INTERVAL,
} from '../constants';

import { buildDispatcher, writerDispatcher, accountDispatcher } from './dispatcher';
import { fetchNetworks, fetchAccount, fetchProducerMonitoringData, fetchChainMonitoringData } from './fetchers';
import { destroyIdentity } from './destroyers';
import { pushTransaction } from './transaction';

import {triggerUpdatedMonitor} from '../actions';

// client (re)build can be triggered by signer set, networks loaded, or user request
function* watchForClientBuild() {
  yield takeLatest([SET_SIGNER, LOADED_NETWORKS, SET_NETWORK, SET_IDENTITY], buildDispatcher);
}

function* watchForLink() {
  yield takeLatest([SET_IDENTITY], writerDispatcher);
}

// account( re)load can be triggered by reader or writer enabled, or user request
function* watchForAccountLoad() {
  yield takeLatest([READER_ENABLED, WRITER_ENABLED], accountDispatcher);
}

// load networks should be triggered immediately on container load / app start
function* watchLoadNetworks() {
  yield takeLatest(LOAD_NETWORKS, fetchNetworks);
}

// load accounts is triggered by the account dispatcher
function* watchLoadAccount() {
  yield takeLatest(LOAD_ACCOUNT, fetchAccount);
}

// load accounts is triggered by the account dispatcher
function* watchLogout() {
  yield takeLatest(WRITER_DISABLED, destroyIdentity);
}

// load accounts is triggered by the account dispatcher
function* watchTransaction() {
  yield takeLatest(PUSH_TRANSACTION, pushTransaction);
}

const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

function* chainUpdateTimer() {
  yield put(triggerUpdatedMonitor());
  while (true) {
    yield call(wait, UPDATE_INTERVAL);
    yield put(triggerUpdatedMonitor());
  }
}

function* watchUpdateMonitor() {
  yield takeEvery(TRIGGER_UPDATE_MONITOR, fetchProducerMonitoringData);
  yield takeEvery(TRIGGER_UPDATE_MONITOR, fetchChainMonitoringData);
}

export default function* rootSaga() {
  yield all([
    watchForClientBuild(),
    watchForLink(),
    watchForAccountLoad(),
    watchLoadNetworks(),
    watchLoadAccount(),
    watchLogout(),
    watchTransaction(),
    chainUpdateTimer(),
    watchUpdateMonitor(),
  ]);
}
