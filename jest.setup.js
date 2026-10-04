jest.mock(
  "@react-native-async-storage/async-storage",
  () =>
    require(
      "@react-native-async-storage/async-storage/jest/async-storage-mock",
    ),
);

const originalWarn = console.warn;

jest.spyOn(console, "warn").mockImplementation((...args) => {
  const message = args.map(String).join(" ");

  if (message.includes("ExpoModulesCoreJSLogger")) {
    return;
  }

  if (message.includes("SafeAreaView has been deprecated")) {
    return;
  }

  originalWarn(...args);
});
