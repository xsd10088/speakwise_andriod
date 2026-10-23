jest.mock(
  "@react-native-async-storage/async-storage",
  () =>
    require(
      "@react-native-async-storage/async-storage/jest/async-storage-mock",
    ),
);

const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  const message = args.map(String).join(" ");

  if (message.includes("ExpoModulesCoreJSLogger")) {
    return;
  }

  if (message.includes("SafeAreaView has been deprecated")) {
    return;
  }

  originalWarn(...args);
};

console.error = (...args) => {
  const message = args.map(String).join(" ");

  if (message.includes("ExpoModulesCoreJSLogger")) {
    return;
  }

  if (message.includes("Cannot log after tests are done")) {
    return;
  }

  originalError(...args);
};