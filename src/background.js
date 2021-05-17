chrome.runtime.onInstalled.addListener(() => {
  console.log("now it is installed");
});

// chrome.windows.onCreated.addListener((window) => {
//   chrome.runtime.sendMessage({
//     name: "windowCreated",
//     payload: { window: window },
//   });
// });

// chrome.windows.onRemoved.addListener((windowId) => {
//   chrome.runtime.sendMessage({
//     name: "windowRemoved",
//     payload: { windowId },
//   });
// });

// chrome.windows.onFocusChanged.addListener((windowId) => {
//   console.log("windowID " + windowId);
//   //새로 포커스된 윈도 아디임
//   chrome.runtime.sendMessage({
//     name: "windowFocusChanged",
//     payload: { windowId },
//   });
// });

// chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
//   chrome.runtime.sendMessage({
//     name: "windowFocusChanged",
//     payload: { tabId, windowId },
//   });
// });

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.
      Old value was "${oldValue}", new value is "${newValue}".`
    );
  }

  /**
   * 1번 케이스 ADD
   * old value = undefined
   *
   * 2번 케이스 DELETE
   * new value = undefined
   *
   * 3번 케이스 UPDATE
   * 이게 문제네
   * 그룹 이름 변경시
   * 그 전 이름의 그룹을 삭제하고
   * 새로운 이름의 그룹을 똑같은 탭으로 생성
   * 그럼 이벤트가 2번일어나네 얘는 이걸 어떻게 알지?
   * update/add/delete 구별하는 방법이 있나? 따로 없는거같은데?
   * 더하거나/지우거나/수정하거나
   */

  chrome.runtime.sendMessage({ name: "storageUpdated", payload: changes });
});
