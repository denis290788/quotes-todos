export default {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.css(\\?inline)?$": "<rootDir>/__mocks__/styleMock.js",
    },
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
