import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(
      "https://fe19-e-commerce-api.herokuapp.com/login",
      data
    );
    yield localStorage.setItem(
      "userInfo",
      JSON.stringify({
        accessToken: result.data.accessToken,
        role: result.data.user.role,
      })
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    if (result.data.user.role === "admin") {
      yield callback.redirectDashboard();
    } else {
      yield callback.redirectHome();
    }
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error:
          (e.response.data === "Cannot find user" ||
            e.response.data === "Incorrect password") &&
          "Đăng nhập thất bại",
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post(
      "https://fe19-e-commerce-api.herokuapp.com/register",
      data
    );
    yield put({ type: SUCCESS(AUTH_ACTION.REGISTER) });
    yield callback.goBackLogin();
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error:
          e.response.data === "Email already exists"
            ? "Email đã tồn tại"
            : "Đăng ký không thành công",
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(
      `https://fe19-e-commerce-api.herokuapp.com/users/${id}`
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        error: "Lấy không được",
      },
    });
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post("https://fe19-e-commerce-api.herokuapp.com/login", {
      email: data.email,
      password: data.oldPassword,
    });
    yield axios.patch(`https://fe19-e-commerce-api.herokuapp.com/users/${id}`, {
      password: data.newPassword,
    });
    yield callback.clearForm();
    yield put({
      type: SUCCESS(AUTH_ACTION.CHANGE_PASSWORD),
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.CHANGE_PASSWORD),
      payload: {
        error: "Lấy không được",
      },
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.CHANGE_PASSWORD), changePasswordSaga);
}
